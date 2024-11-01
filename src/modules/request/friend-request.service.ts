import { Injectable, NotFoundException } from "@nestjs/common";
import { Model } from "mongoose";
import { friendRequest, friendRequestDocument } from "./schemas/friend-request.schema";
import { CreateFriendRequestDto } from "./dto/create-friend-request.dto";
import { UpdateFriendRequestDto } from "./dto/update-friend-request.dto";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class FriendRequestService {
    constructor(
        @InjectModel(friendRequest.name) private friendRequestModel: Model<friendRequestDocument>,
    ) {}

    async create(createFriendRequestDto: CreateFriendRequestDto): Promise<friendRequest> {
        const friendRequest = new this.friendRequestModel(createFriendRequestDto);
        return friendRequest.save();
    }

    async update(id: string, updateFriendRequestDto: UpdateFriendRequestDto): Promise<friendRequest> {
        const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
            id,
            { status: updateFriendRequestDto.status },
            { new: true }
        );
        if (!friendRequest) {
            throw new NotFoundException(`Friend request with id ${id} not found`);
        }
        return friendRequest;
    }

    async getFriendRequestsForUser(userId: string): Promise<friendRequest[]> {
        return this.friendRequestModel.find({ receiver: userId, status: 'pending' }).populate('sender', 'username');
    }

    async acceptFriendRequest(id: string): Promise<friendRequest> {
        const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
            id,
            { status: 'accepted' },
            { new: true }
        );
        if (!friendRequest) {
            throw new NotFoundException(`Friend request with id ${id} not found`);
        }
        return friendRequest;
    }

    async denyFriendRequest(id: string): Promise<friendRequest> {
        const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
            id,
            { status: 'denied' },
            { new: true }
        );
        if (!friendRequest) {
            throw new NotFoundException(`Friend request with id ${id} not found`);
        }
        return friendRequest;
    }
}
