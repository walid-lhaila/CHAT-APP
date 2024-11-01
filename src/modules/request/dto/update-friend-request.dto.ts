import { IsIn } from 'class-validator'

export class UpdateFriendRequestDto{
    @IsIn(['accepted', 'rejected'])
    status: 'accepted' | 'rejected'
}