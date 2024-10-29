import { IsNumber, IsString } from "class-validator";



export class CreateRatingDto {
    
    @IsString()
    rater: string;

    @IsString()
    user: string;

    @IsNumber()
    score: number;
    
}