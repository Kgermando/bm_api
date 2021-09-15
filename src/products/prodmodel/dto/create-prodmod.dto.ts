import { IsNotEmpty } from "class-validator";

export class CreateProdModelDto {
    @IsNotEmpty()
    categorie: string;

    sousCategorie1: string;

    sousCategorie2: string;

    sousCategorie3: string;

    sousCategorie4: string;

    idProduct: string;
}