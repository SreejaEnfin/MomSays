// src/user/dto/create-user.dto.ts
import { IsEnum, IsOptional, IsString, IsUUID, IsPhoneNumber, Length, IsNumber } from 'class-validator';
import { UserRole } from 'src/utils/enums/role.enum';

export class CreateUserDto {
    @IsString()
    @Length(1, 50)
    name: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    email?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    password?: string;

    @IsOptional()
    @IsPhoneNumber()
    phone?: string;

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsUUID()
    parentId?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    alias?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    language?: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    avatar?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Age must be a number' })
    age?: number;
}
