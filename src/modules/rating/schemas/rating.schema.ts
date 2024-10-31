import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema()
export class Rating extends Document {

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  rater: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  score: number;


}


export type RatingDocument = Rating & Document
export const RatingSchema = SchemaFactory.createForClass(Rating);