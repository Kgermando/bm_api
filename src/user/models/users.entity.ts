import { Exclude } from "class-transformer";
import { Role } from "src/role/role.entity";

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ unique: true })
    username: string;

    @Column()
    email: string;

    @Column()
    telephone: string;

    @Column()
    name_business: string;

    @Column()
    type_abonnement: string;

    @Column()
    @Exclude()
    password: string;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'roleId' })
    role: Role;
}
