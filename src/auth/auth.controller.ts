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
import { RegisterDto } from './models/register.dto';
import { ImageService } from 'src/user/image.service';
import * as fs from 'fs';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileName } from 'src/utils/image-name.utils';
import { imageExtensionFilter } from 'src/utils/image-extension.utils';

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
    // uploadFile(@UploadedFile() file) {
    //     console.log(file);
    //     return {
    //         url: `http://192.168.43.230:3000/api/auth/${file.path}`
    //     }
    // } 

    // @Post('register')
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
        const image = logo.path;
        console.log(image);
        await this.imageService.resize(logo.path);
        return this.usersService.create({
            logo: image,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            telephone: body.telephone,
            nameBusiness: body.nameBusiness,
            succursale: body.succursale,
            typeAbonnement: body.typeAbonnement,
            province: body.province,
            role: body.role,
            createdAt: body.createdAt,
            password: hashed
        });
    }

    // @Get('uploads/:path')
    // async getImage(@Param('path') path, @Res() res: Response) {
    //     res.sendFile(path, {root: 'uploads'});
    // }

    // @Post('register')
    // async register(@Body() body: RegisterDto) {

    //     if (body.password !== body.passwordConfirm) {
    //         throw new BadRequestException('Le mot de passe ne match pas!');
    //     }
    //     const hashed = await bcrypt.hash(body.password, 12);

    //     return this.usersService.create({
    //         logo: body.logo,
    //         firstName: body.firstName,
    //         lastName: body.lastName,
    //         email: body.email,
    //         telephone: body.telephone,
    //         nameBusiness: body.nameBusiness,
    //         succursale: body.succursale,
    //         typeAbonnement: body.typeAbonnement,
    //         province: body.province,
    //         role: body.role,
    //         createdAt: body.createdAt,
    //         password: hashed
    //     });
    // }


    // @Post('upload')
    // @UseInterceptors(
    //     FileInterceptor('logo', {
    //         storage: diskStorage({
    //             destination: './uploads',
    //             filename: imageFileName,
    //         }),
    //         fileFilter: imageExtensionFilter,
    //     }),
    // )


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
            province: body.province,
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

}

