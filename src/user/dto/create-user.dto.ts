// src/user/dto/create-user.dto.ts
import { IsEnum, IsOptional, IsString, IsUUID, IsPhoneNumber, Length } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsString()
    @Length(1, 50)
    name: string;

    @IsOptional()
    @IsString()
    @Length(1, 50)
    email?: string; // Parent only

    @IsOptional()
    @IsString()
    @Length(1, 50)
    password?: string; // Parent only

    @IsOptional()
    @IsPhoneNumber()
    phone?: string; // Parent only

    @IsEnum(UserRole)
    role: UserRole;

    @IsOptional()
    @IsUUID()
    parentId?: string; // Child only

    @IsOptional()
    @IsString()
    @Length(1, 50)
    alias?: string; // Child only (main alias, optional)
}
