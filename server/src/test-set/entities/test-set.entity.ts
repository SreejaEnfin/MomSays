// test-set.entity.ts
import { Question } from 'src/question/entities/question.entity';
import { TestResponse } from 'src/test-response/entities/test-response.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
} from 'typeorm';

@Entity()
export class TestSet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User)
    parent: User;

    @ManyToOne(() => User, { nullable: true })
    child: User;

    @ManyToMany(() => Question)
    @JoinTable()
    questions: Question[];

    @Column()
    assignedDate: Date;

    @OneToMany(() => TestResponse, (response) => response.testSet)
    responses: TestResponse[];

    @Column()
    ageGroup: string;

    @Column("uuid", { array: true })
    category: string[];

    @Column({ default: 'draft' })
    status: 'draft' | 'launched'
}
