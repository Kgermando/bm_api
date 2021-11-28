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
    province: string;  

    @Column()
    role: string;

    @Column()
    createdAt: Date;

    @Column()
    @Exclude()
    password: string;
}
