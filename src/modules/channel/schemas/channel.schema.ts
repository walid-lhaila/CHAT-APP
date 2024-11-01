import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop({ required: true })
  Title: string;

  @Prop({ type: [String], required: true })
  members: string[];

  @Prop({
    required: true,
    enum: ['public', 'private', 'conversation'],
    default: 'private',
  })
  type: string;

  @Prop({ required: true })
  userId: Object.type.type;

  @Prop({ type: [String], required: true })
  badWords: string[];
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
