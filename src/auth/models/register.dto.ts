import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    nameBusiness: string;

    @IsNotEmpty()
    typeAbonnement: string;

    @IsNotEmpty()
    province: string;

    // @IsNotEmpty()
    // roleId: number;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    passwordConfirm: string;

    // @IsNotEmpty()
    // createdAt: Date;

    // @IsNotEmpty()
    // updatedAt: Date;
}