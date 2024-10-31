import { Controller, Get, Post, Put, Param, Body } from "@nestjs/common";
import { friendRequestDocument } from "./schemas/friend-request.schema";
import { CreateFriendRequestDto } from "./dto/create-friend-request.dto";
import { UpdateFriendRequestDto } from "./dto/update-friend-request.dto";
import { FriendRequestService } from "./friend-request.service";


@Controller('friend-requests')
export class friendRequestCotroller {
    constructor(private readonly friendrequestService: FriendRequestService) { }

    @Post()

    async sendFriendRequest(@Body() createFriendRequestDto: CreateFriendRequestDto) {
        return this.friendrequestService.create(createFriendRequestDto)
    }

    @Put('/:id')
    async respondToFriendRequest(
        @Param('id') id: string,
        @Body() updateFriendRequestDto: UpdateFriendRequestDto,
    ) {
        return this.friendrequestService.update(id, updateFriendRequestDto)
        
    }
    
}