import { IsBoolean, IsString } from "class-validator";



export class CreateNotificationDto {

    @IsString()
    receiver: string;

    @IsString()
    content: string;

    @IsBoolean()
    isOpen: boolean;

}