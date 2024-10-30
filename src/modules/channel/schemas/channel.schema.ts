import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop({ required: true })
  Title: string;

  @Prop({ type: [Number], required: true })
  members: number[];

  @Prop({ required: true, enum: ['public', 'private', 'conversation'] })
  type: string;

  @Prop({ type: [String], required: true })
  badWords: string[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
