import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FriendRequestService } from './friend-request.service';
import { FriendRequestController } from './friend-request.controller';
import { friendRequest, FriendRequestSchema } from './schemas/friend-request.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: friendRequest.name, schema: FriendRequestSchema }])],
  controllers: [FriendRequestController],
  providers: [FriendRequestService],
})
export class FriendRequestModule {}
