import {
    IsArray,
    IsDateString,
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateTestSetDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsUUID()
    parentId: string;

    @IsUUID()
    childId: string;

    @IsArray()
    @IsUUID('all', { each: true })
    questionIds: string[];

    @IsDateString()
    assignedDate: string;
}
