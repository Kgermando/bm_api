import {
    BadRequestException,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Post,
    Req,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './models/register.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) { }

    @Post('register')
    async register(@Body() body: RegisterDto) {
        if (body.password !== body.passwordConfirm) {
            throw new BadRequestException('Le mot de passe ne match pas!');
        }
        const hashed = await bcrypt.hash(body.password, 12);
        return this.usersService.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            telephone: body.telephone,
            nameBusiness: body.nameBusiness,
            typeAbonnement: body.typeAbonnement,
            province: body.province,
            password: hashed,
            role: { id: 1 },
            createdAt: body.createdAt,
            updatedAt: body.updatedAt,
        });
    }

    @Post('login')
    async login(
        @Body('telephone') telephone: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.usersService.findOne({ telephone });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { 
            httpOnly: true,
            sameSite: 'lax'
        });
        return user;
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        return this.usersService.findOne({ id: data['id'] });
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');

        return {
            message: 'Success',
        };
    }

}
