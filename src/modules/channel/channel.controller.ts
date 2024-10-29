import { Controller, Get, Post, Patch, Param, Body, Delete } from '@nestjs/common';
import { CreateChannelDto } from './dto/createChannel.dto';
import { ChannelService } from '../channel/channel.service';
import { UpdateChannelDto } from './dto/updateChannel.dto';



@Controller('channels')
export class ChannelController {

    constructor(private readonly channelService: ChannelService) {}


    @Post()
    async create(@Body() createChannelDto: CreateChannelDto) {

    }


    @Get()
    async findAll() {

    }


    @Get(':id')
    async findOne(@Param('id') id: string) {

    }


    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {

    }


    @Delete(':id')
    async remove(@Param('id') id: string) {

    }

}