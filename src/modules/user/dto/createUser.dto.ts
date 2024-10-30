import { IsString, IsEmail, IsArray, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {

    @IsString()
    username: string;

    @IsEmail()
    email: string;
    
    @IsOptional()
    @IsString()
    password: string;

    @IsString()
    status: string;

    @IsArray()
    @IsOptional()
    friends?: string[];

    @IsArray()
    @IsOptional()
    channel?: string[];

    @IsNumber()
    score: number;

}