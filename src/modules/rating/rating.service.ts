import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Rating, RatingDocument } from "./schemas/rating.schema";



@Injectable()
export class RatingService {

        constructor(@InjectModel(Rating.name) private readonly ratingModel: Model<RatingDocument>) {}

        async createRating(raterId: string, userId: string, score: number): Promise<Rating> {
            if(score < 1 || score > 5){
                throw new NotFoundException('Score Must Be Between 1 and 5');
            }

            const newRating = new this.ratingModel({
                rater: raterId,
                user: userId,
                score,
            });

            return newRating.save();
        }
}