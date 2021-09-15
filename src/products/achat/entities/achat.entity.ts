import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Achat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    idProduct: string;

    @Column()
    categorie: string;

    @Column()
    sousCategorie1: string;

    @Column()
    sousCategorie2: string;

    @Column()
    sousCategorie3: string;

    @Column()
    sousCategorie4: string;

    @Column()
    quantity: string;

    @Column()
    priceAchatTotal: string;

    @Column()
    prixVenteUnit: string;

    @Column()
    date: Date;
}
