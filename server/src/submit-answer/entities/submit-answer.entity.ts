import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ database: 'postgres', name: 'submit_answer' })
export class SubmitAnswer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    testId: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    childId: string;

    @Column({ type: 'varchar', length: 50, nullable: false })
    parentId: string;

    @Column()
    assignedDateTime: Date;

    @Column({ type: 'json', nullable: false })
    questions: Record<string, { selectedAnswer: string; isCorrect: boolean }>;
}
