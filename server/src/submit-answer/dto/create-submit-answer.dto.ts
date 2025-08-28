import { IsUUID, IsObject, IsDateString } from "class-validator";

export class SubmitAnswerDto {
    @IsUUID()
    childId: string;

    @IsUUID()
    testId: string;

    @IsUUID()
    parentId: string;

    @IsDateString()
    attendedDateTime: string;

    @IsObject()
    questions: Record<string, { selectedAnswer: string; isCorrect: boolean }>;
}
