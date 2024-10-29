import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';



@Schema()
export class Request extends Document {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    from: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    to: Types.ObjectId;

    @Prop({ required: true, enum: ['pending', 'accepted', 'rejected'] })
    status: string;


}



export const RequestSchema = SchemaFactory.createForClass(Request);