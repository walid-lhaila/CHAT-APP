import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from './schemas/channel.schema';
import { CreateChannelDto } from './dto/createChannel.dto';

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
  ) {}

  async CreateChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    const { Title, members, type, badWords } = createChannelDto;

    const newChannel = new this.channelModel({
      Title,
      members,
      type,
      badWords,
    });
    try {
      return await newChannel.save();
    } catch (err) {
      console.error('err', err);
    }
  }

  async findAll(): Promise<Channel[]> {
    return await this.channelModel.find().exec();
  }

  async DeleteChanel(id: string): Promise<void> {
    await this.channelModel.findByIdAndDelete(id).exec();
  }
}
