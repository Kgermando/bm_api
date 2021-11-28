import { IsNotEmpty, IsString } from "class-validator";


export class UpdateAvatarDto{
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    logo: string;
}