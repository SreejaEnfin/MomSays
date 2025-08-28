import { Category } from 'src/category/entities/category.entity';
import { TestResponse } from 'src/test-response/entities/test-response.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';

@Entity()
export class Question {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    text: string;

    @Column('simple-array')
    options: string[];

    @Column()
    correctAnswer: number;

    @ManyToOne(() => Category, (category) => category.questions, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column()
    categoryId: string;

    @Column({ default: 'en' })
    language: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => TestResponse, (response) => response.question)
    responses: TestResponse[];

    @Column({ nullable: true })
    audioUrl: string;
}
