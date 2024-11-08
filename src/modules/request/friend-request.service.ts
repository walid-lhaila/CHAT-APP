import { Injectable, NotFoundException } from "@nestjs/common";
import { Model, Types } from "mongoose";
import {
  friendRequest,
  friendRequestDocument,
} from "./schemas/friend-request.schema";
import { CreateFriendRequestDto } from "./dto/create-friend-request.dto";
import { UpdateFriendRequestDto } from "./dto/update-friend-request.dto";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "../user/schemas/user.schema";

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectModel(friendRequest.name)
    private friendRequestModel: Model<friendRequestDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(
    createFriendRequestDto: CreateFriendRequestDto,
  ): Promise<friendRequest> {
    const friendRequest = new this.friendRequestModel(createFriendRequestDto);
    return friendRequest.save();
  }

  async update(
    id: string,
    updateFriendRequestDto: UpdateFriendRequestDto,
  ): Promise<friendRequest> {
    const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
      id,
      { status: updateFriendRequestDto.status },
      { new: true },
    );
    if (!friendRequest) {
      throw new NotFoundException(`Friend request with id ${id} not found`);
    }
    return friendRequest;
  }

  async getFriendRequestsForUser(userId: string): Promise<friendRequest[]> {
    return this.friendRequestModel
      .find({ receiver: userId, status: "pending" })
      .populate("sender", "username");
  }

  async acceptFriendRequest(id: string): Promise<friendRequest> {
    const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true },
    );
    if (!friendRequest) {
      throw new NotFoundException(`Friend request with id ${id} not found`);
    }

    const { sender, receiver } = friendRequest;

    const senderUser = await this.userModel.findById(sender);
    const receiverUser = await this.userModel.findById(receiver);

    if (!senderUser || !receiverUser) {
      throw new NotFoundException(`One of the users in the friend request not found`);
    }

    const senderId = senderUser._id as Types.ObjectId;
    const receiverId = receiverUser._id as Types.ObjectId;

    if (!senderUser.friends.includes(receiverId)) {
      senderUser.friends.push(receiverId);
    }
    if (!receiverUser.friends.includes(senderId)) {
      receiverUser.friends.push(senderId);
    }

    await senderUser.save();
    await receiverUser.save();

    return friendRequest;
  }

  async denyFriendRequest(id: string): Promise<friendRequest> {
    const friendRequest = await this.friendRequestModel.findByIdAndUpdate(
      id,
      { status: "denied" },
      { new: true },
    );
    if (!friendRequest) {
      throw new NotFoundException(`Friend request with id ${id} not found`);
    }
    return friendRequest;
  }
}
