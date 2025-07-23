import { Question } from "src/question/entities/question.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    categoryName: string;

    @Column({ nullable: true })
    categoryDesc: string;

    @Column()
    minAge: number;

    @Column()
    maxAge: number;

    @Column({ nullable: true })
    displayOrder: number;

    @Column({ default: true })
    isActive: boolean;

    @Column({ nullable: true })
    imageUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Question, (question) => question.category)
    questions: Question[];

}
