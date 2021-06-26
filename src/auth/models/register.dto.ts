import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    first_name: string;

    @IsNotEmpty()
    last_name: string;

    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    telephone: string;

    @IsNotEmpty()
    name_business: string;

    @IsNotEmpty()
    type_abonnement: string;

    @IsNotEmpty()
    roleId: number;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    password_confirm: string;
}