import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProdModel {
    @PrimaryGeneratedColumn()
    id: number;
    
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
    idProduct: string;
}