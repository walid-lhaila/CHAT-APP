import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ default: "online" })
  status: string;

  @Prop({ type: [Types.ObjectId], ref: "User" })
  friends: Types.ObjectId[];

  @Prop({ type: [Types.ObjectId], ref: "Channel" })
  channel: Types.ObjectId[];

  @Prop({ default: 0 })
  score: number;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
