import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateQuestionDto {
    @IsString()
    @IsNotEmpty()
    text: string;

    @IsArray()
    @ArrayMinSize(2)
    @ArrayMaxSize(5)
    @IsString({ each: true })
    options: string[];

    @IsNumber()
    correctAnswer: number;

    @IsUUID()
    categoryId: string;
}
