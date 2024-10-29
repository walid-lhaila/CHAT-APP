import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types} from 'mongoose';


@Schema()
export class Channel extends Document {

    @Prop({ required: true, unique: true})
    name: string;

    @Prop({ type: [Types.ObjectId], ref: 'User' })
    members: Types.ObjectId[];

    @Prop({ required: true, enum: ['public', 'private', 'conversation'] })
    type: string;

    @Prop({ type: [String] })
    badWords: string[];

}


export type ChannelDocument = Channel & Document;
export const ChannelSchema = SchemaFactory.createForClass(Channel)