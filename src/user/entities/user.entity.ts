import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    PARENT = 'parent',
    CHILD = 'child',
}

@Entity({ database: 'postgres', name: 'user' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    password: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.PARENT })
    role: UserRole;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 50, nullable: true })
    parentId: string | null;

    @Column({ type: "varchar", length: 50 })
    phone: string;
}
