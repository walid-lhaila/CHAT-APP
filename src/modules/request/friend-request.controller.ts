import {
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Body,
    NotFoundException,
  } from '@nestjs/common';
  import { FriendRequestService } from './friend-request.service';
  import { CreateFriendRequestDto } from './dto/create-friend-request.dto';
  
  @Controller('friend-requests')
  export class FriendRequestController {
    constructor(private readonly friendRequestService: FriendRequestService) {}
  
    @Post('/create')
    async create(@Body() createFriendRequestDto: CreateFriendRequestDto) {
      return this.friendRequestService.create(createFriendRequestDto);
    }
  
    @Get('/user/:userId')
    async getFriendRequestsForUser(@Param('userId') userId: string) {
      return this.friendRequestService.getFriendRequestsForUser(userId);
    }
  
    @Patch('/accept/:id')
    async acceptFriendRequest(@Param('id') id: string) {
      return this.friendRequestService.acceptFriendRequest(id);
    }
  
    @Patch('/deny/:id')
    async denyFriendRequest(@Param('id') id: string) {
      return this.friendRequestService.denyFriendRequest(id);
    }
  }
  