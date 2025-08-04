import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class VoiceUploader {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    parentId: string;

    @Column()
    scenarioCode: string;

    @Column()
    fileName: string;

    @CreateDateColumn()
    uploadedAt: Date;

    @Column({ default: true })
    isDefault: boolean;
}
