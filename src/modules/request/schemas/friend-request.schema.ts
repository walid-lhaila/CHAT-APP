import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../user/schemas/user.schema'

export type friendRequestDocument = friendRequest & Document



@Schema()
export class friendRequest  {

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    sender: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    recevier: Types.ObjectId;

    @Prop({ required: true, enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
    status: string;


}



export const FriendRequestSchema  = SchemaFactory.createForClass(friendRequest);