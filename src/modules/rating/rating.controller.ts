import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { RatingService } from './rating.service';


@Controller('ratings')

export class RatingController {

    constructor(private readonly ratingService: RatingService) {}


    @Post('rate')
    async createRating(

        @Body('raterId') raterId: string,
        @Body('userId') userId: string,
        @Body('score') score: number,
    ) {
        if(!raterId || !userId || score === undefined) {
            throw new BadRequestException('raterId, userId, and score are required');
        }

        return this.ratingService.createRating(raterId, userId, score);
    }
}