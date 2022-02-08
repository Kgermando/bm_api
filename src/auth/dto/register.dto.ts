import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    // @IsNotEmpty()
    logo: string;

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
    succursale: string;

    @IsNotEmpty()
    typeAbonnement: string;

    @IsNotEmpty()
    monnaie: string;

    @IsNotEmpty()
    rccm: string;

    @IsNotEmpty()
    nImpot: string;

    @IsNotEmpty()
    idNat: string;

    @IsNotEmpty()
    pays: string;

    @IsNotEmpty()
    adresse: string;

    @IsNotEmpty()
    adresseSucc: string;

    @IsNotEmpty()
    role: string;

    @IsNotEmpty()
    createdAt: Date;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    passwordConfirm: string;

}