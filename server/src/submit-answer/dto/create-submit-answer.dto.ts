import { IsString, IsUUID } from "class-validator";

export class SubmitAnswerDto {
    @IsUUID()
    childId: string;

    @IsUUID()
    testSetId: string;

    @IsUUID()
    questionId: string;

    @IsString()
    selectedAnswer: number;
}
