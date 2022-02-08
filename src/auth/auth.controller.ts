import {
    BadRequestException,
    Bind,
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
    Req,
    Res,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dto/register.dto';
import { ImageService } from 'src/user/image.service';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileName } from 'src/utils/image-name.utils';
import { imageExtensionFilter } from 'src/utils/image-extension.utils';
import { ChangePasswordDto } from './dto/change-password.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
        private imageService: ImageService
    ) { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('logo', {
            storage: diskStorage({
                destination: './uploads',
                filename: imageFileName,
            }),
            fileFilter: imageExtensionFilter,
        }),
    )
    
    async register(
        @Body() body: RegisterDto,
        @UploadedFile() logo,
    ) {
        if (!logo?.path || !fs.existsSync(logo.path)) {
            throw new BadRequestException('File not loaded');
        }
        if (body.password !== body.passwordConfirm) {
            throw new BadRequestException('Le mot de passe ne match pas!');
        }
        const hashed = await bcrypt.hash(body.password, 12);
        // const image = logo.path;
        // console.log(image);
        await this.imageService.resize(logo.path);
        return this.usersService.create({
            logo: logo.path,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            telephone: body.telephone,
            nameBusiness: body.nameBusiness,
            succursale: body.succursale,
            typeAbonnement: body.typeAbonnement,
            monnaie: body.monnaie,
            rccm: body.rccm,
            nImpot: body.nImpot,
            idNat: body.idNat,
            pays: body.pays,
            adresse: body.adresse,
            adresseSucc: body.adresseSucc,
            role: body.role,
            createdAt: body.createdAt,
            password: hashed
        });
    }


    @Post('registeruser')
    async registeruser(
        @Body() body: RegisterDto
    ) {
        if (body.password !== body.passwordConfirm) {
            throw new BadRequestException('Le mot de passe ne match pas!');
        }
        const hashed = await bcrypt.hash(body.password, 12);
        return this.usersService.create({
            logo: body.logo,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            telephone: body.telephone,
            nameBusiness: body.nameBusiness,
            succursale: body.succursale,
            typeAbonnement: body.typeAbonnement,
            monnaie: body.monnaie,
            rccm: body.rccm,
            nImpot: body.nImpot,
            idNat: body.idNat,
            pays: body.pays,
            adresse: body.adresse,
            adresseSucc: body.adresseSucc,
            role: body.role,
            createdAt: body.createdAt,
            password: hashed
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
            httpOnly: false, // La valeur qui etait configuré est True
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


    async changePassword(id: number, changePasswordDto: ChangePasswordDto) {
        const { oldPassword, newPassword, confirmPassword } = changePasswordDto
        if (newPassword !== confirmPassword) {
            return ({
                code: 201,
                message: 'Confirm password does not match new password'
            })
        }

        const salt = await bcrypt.genSalt()
        const userPassword = await bcrypt.hash(newPassword, salt)
        try {
            await this.usersService.update(id, { "$set": { password: userPassword } })
        }
        catch (error) {
            return ({
                code: 201,
                message: 'Somethine wrong when update password'
            })
        }
        return ({
            code: 200,
            message: 'Change password successfully'
        })
    }

}

