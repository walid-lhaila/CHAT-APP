import { IsNotEmpty, IsString } from "class-validator";


export class CreateFriendRequestDto  {

    @IsString()
    senderId: string;

    @IsString()
    recieverId: string;
    
    @IsString()
    status: string;

}