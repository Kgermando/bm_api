import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
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
  province: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  createdAt?: string;
  
}
