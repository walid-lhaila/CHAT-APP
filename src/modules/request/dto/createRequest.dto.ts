import { IsString } from "class-validator";


export class CreateRequestDto {

    @IsString()
    from: string;

    @IsString()
    to: string;
    
    @IsString()
    status: string;

}