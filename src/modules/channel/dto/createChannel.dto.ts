import { IsString, IsArray } from 'class-validator';

export class CreateChannelDto {

    @IsString()
    name: string;

    @IsArray()
    members: string[];

    @IsString()
    type: string;

    @IsArray()
    badWords: string[];

}