import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendRequestDto {
  @IsNotEmpty()
  @IsString()
  sender: string; 

  @IsNotEmpty()
  @IsString()
  receiver: string; 


    
    @IsString()
    status: string;

}