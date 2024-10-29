import { IsString, IsBoolean } from "class-validator";


export class CreateMessageDto {

    @IsString()
    text: string;

    @IsString()
    sender: string;

    @IsString()
    channel: string;

    @IsBoolean()
    isOpen: boolean;

    @IsBoolean()
    isDeleted: boolean;
    
}