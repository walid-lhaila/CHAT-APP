import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';


@Schema()
export class Message extends Document {

    @Prop({ required: true })
    text: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Channel', required: true })
    channel: Types.ObjectId;

    @Prop({ default: false })
    isPin: boolean;

    @Prop({ default: false })
    isDeleted: boolean;


}

export const MessageSchema = SchemaFactory.createForClass(Message);