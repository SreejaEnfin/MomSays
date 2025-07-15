import { IsString, Length } from "class-validator";

export class ParentLoginDto {
    @IsString()
    @Length(1, 50)
    email: string;

    @IsString()
    @Length(6, 50)
    password: string;
}