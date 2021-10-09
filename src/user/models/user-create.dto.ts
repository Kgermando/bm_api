import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  // @IsNotEmpty()
  // username: string;

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
  role: string;

  @IsNotEmpty()
  createdAt?: string;
  
  @IsNotEmpty()
  updatedAt?: string;
}
