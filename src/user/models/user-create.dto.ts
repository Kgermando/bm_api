import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {

  @IsNotEmpty()
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
  succursale: String;

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
  createdAt?: string;
  
}
