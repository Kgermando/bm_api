import { Exclude } from "class-transformer";

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    logo: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column({ unique: true })
    telephone: string;

    @Column()
    nameBusiness: string; 

    @Column()
    succursale: string;

    @Column()
    typeAbonnement: string;

    @Column()
    monnaie: string;

    @Column()
    rccm: string;

    @Column()
    nImpot: string;

    @Column()
    idNat: string;

    @Column()
    pays: string; 
    
    @Column()
    adresse: string; 

    @Column()
    adresseSucc: string; 

    @Column()
    role: string;

    @Column()
    createdAt: Date;

    @Column()
    @Exclude()
    password: string;
}
