import { IsNotEmpty } from "class-validator";

export class CreateAchatDetteDto {

    idProduct: string;

    @IsNotEmpty()
    categorie: string;

    sousCategorie1: string;

    sousCategorie2: string;

    sousCategorie3: string;

    sousCategorie4: string;

    quantity: string;

    priceAchatTotal: string;

    prixVenteUnit: string;

    date: Date;
}
