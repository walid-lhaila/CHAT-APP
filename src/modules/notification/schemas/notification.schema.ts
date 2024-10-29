import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema()
export class Notification extends Document {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    receiver: Types.ObjectId;

    @Prop({ required: true })
    content: string;

    @Prop({ default: false })
    isOpen: boolean;


}


export const NotificationSchema = SchemaFactory.createForClass(Notification);