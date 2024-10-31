import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { friendRequest, friendRequestDocument } from "./schemas/friend-request.schema";
import { CreateFriendRequestDto } from "./dto/create-friend-request.dto";
import { UpdateFriendRequestDto } from "./dto/update-friend-request.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FriendRequestService{
    constructor(
        @InjectModel(friendRequest.name) private friendRequestModel: Model<friendRequestDocument>,
    ){}

    async create(CreateFriendRequestDto: CreateFriendRequestDto): Promise<friendRequest>{
        const friendRequest = new this.friendRequestModel(CreateFriendRequestDto);
        return friendRequest.save();
    }
    async update(id:string, UpdateFriendRequestDto: UpdateFriendRequestDto): Promise<friendRequest>{
        const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
            id,
            {status: UpdateFriendRequestDto.status},
            {new: true}
        );
        return friendRequest.save();
    }
    async getFriendRequestForUser(userId: string): Promise<friendRequest[]> {
        return this.friendRequestModel.find({reciever: userId, status:'pending'}).populate('sender', 'username')
    }

}