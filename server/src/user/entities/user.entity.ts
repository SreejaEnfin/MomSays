import { TestResponse } from "src/test-response/entities/test-response.entity";
import { TestSet } from "src/test-set/entities/test-set.entity";
import { UserRole } from "src/utils/enums/role.enum";
import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'postgres', name: 'user' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
    email: string;

    @Column({ type: 'varchar', length: 150, nullable: true })
    password: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;

    @Column({ type: 'enum', enum: UserRole, default: UserRole.PARENT })
    role: UserRole;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'varchar', length: 50, nullable: true })
    parentId: string | null;

    @Column({ type: "varchar", length: 50, nullable: true })
    phone: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    avatar: string | null;

    @Column({ type: 'varchar', length: 50, nullable: true })
    language: string | null;

    @Column({ type: 'int', nullable: true })
    age: number | null;

    @Index(['alias', 'parentId'], { unique: true })
    @Column({ type: 'varchar', length: 50, nullable: true })
    alias?: string;

    @OneToMany(() => TestSet, (testSet) => testSet.parent)
    testSetsAsParent: TestSet[];

    @OneToMany(() => TestSet, (testSet) => testSet.child)
    testSetsAsChild: TestSet[];

    @OneToMany(() => TestResponse, (response) => response.child)
    responses: TestResponse[];

    @Column({ default: false })
    hasSeenWelcomeMessage?: boolean;

}

