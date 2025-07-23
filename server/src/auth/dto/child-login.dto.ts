import { IsString, Length } from "class-validator";

export class ChildLoginDto {
    @IsString()
    @Length(1, 50)
    alias: string;

    @IsString()
    @Length(1, 50)
    role: string
}