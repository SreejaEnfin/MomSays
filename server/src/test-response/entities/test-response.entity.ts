import { Question } from "src/question/entities/question.entity";
import { TestSet } from "src/test-set/entities/test-set.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TestResponse {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User)
    child: User;

    @ManyToOne(() => TestSet)
    testSet: TestSet;

    @Column()
    selectedAnswer: number;

    @Column()
    isCorrect: boolean;

    @CreateDateColumn()
    attemptedAt: Date;

    @ManyToOne(() => Question, (question) => question.responses)
    question: Question;
}
