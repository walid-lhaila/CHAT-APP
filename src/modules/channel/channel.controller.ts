import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateChannelDto } from './dto/createChannel.dto';
import { ChannelService } from './channel.service';
import { Channel } from './schemas/channel.schema';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    console.log(createChannelDto);
    const channel = await this.channelService.CreateChannel(createChannelDto);
    return { message: 'Channel created successfully', channel };
  }

  @Get()
  async findAll(): Promise<Channel[]> {
    return this.channelService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.channelService.DeleteChannel(id);
    return { message: 'Channel deleted successfully' };
  }

  @Post(':channelId/integrateUser')
  async integrateUserIntoChannel(
    @Param('channelId') channelId: string,
    @Body('userId') userId: string,
  ) {
    return this.channelService.integrationUsersIntoChannel(channelId, userId);
  }

  @Patch(':channelId/update')
  async updateChannel(
    @Param('channelId') channelId: string,
    @Body() updatedChannel: Channel,
  ) {
    const updated = await this.channelService.updateChannel(
      channelId,
      updatedChannel,
    );
    return { message: 'Channel updated successfully', updatedChannel: updated };
  }

  @Delete(':channelId/removeUser/:userId')
  async deleteUserFromChannel(
    @Param('userId') userId: string,
    @Param('channelId') channelId: string,
  ) {
    await this.channelService.deleteUserFromChannel(userId, channelId);
    return { message: 'User deleted from channel successfully' };
  }
}
