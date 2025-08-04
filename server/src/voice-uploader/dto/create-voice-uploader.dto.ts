import { IsString } from "class-validator";

export class CreateVoiceUploaderDto {
    @IsString()
    parentId: string;

    @IsString()
    label: string;
}
