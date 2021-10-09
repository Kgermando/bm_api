import { Exclude } from "class-transformer";
import { Role } from "src/role/role.entity";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    // @Column({ unique: true })
    // username: string;

    @Column()
    email: string;

    @Column({ unique: true })
    telephone: string;

    @Column()
    nameBusiness: string;

    @Column()
    typeAbonnement: string;

    @Column()
    province: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleId' })
    role: Role;
    
    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
