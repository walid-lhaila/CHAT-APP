import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateChannelDto } from './dto/createChannel.dto';
import { ChannelService } from '../channel/channel.service';
import { Channel } from './schemas/channel.schema';

@Controller('channels')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  async create(@Body() createChannelDto: CreateChannelDto) {
    console.log(createChannelDto);
    return this.channelService.CreateChannel(createChannelDto);
  }

  @Get()
  async findAll(): Promise<Channel[]> {
    return this.channelService.findAll();
  }
}
