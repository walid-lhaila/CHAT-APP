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

  async DeleteChannel(id: string): Promise<void> {
    await this.channelModel.findByIdAndDelete(id).exec();
  }

  async integrationUsersIntoChannel(
    channelId: string,
    userId: string,
  ): Promise<any> {
    try {
      const updatedChannel = await this.channelModel.findByIdAndUpdate(
        channelId,
        { $addToSet: { members: userId } },
        { new: true },
      );

      if (!updatedChannel) {
        return { message: 'Channel not found' };
      }

      return {
        message: 'User successfully integrated into the channel',
        channel: updatedChannel,
      };
    } catch (error) {
      throw new Error('Error integrating user into channel: ' + error.message);
    }
  }

  async updateChannel(channelId: string, updatedChannel: Channel) {
    try {
      return await this.channelModel.findByIdAndUpdate(
        channelId,
        updatedChannel,
        { new: true },
      );
    } catch (error) {
      throw new Error('Error updating channel: ' + error.message);
    }
  }

  async deleteUserFromChannel(userId: string, channelId: string) {
    try {
      const updatedChannel = await this.channelModel.findByIdAndUpdate(
        channelId,
        { $pull: { members: userId } },
        { new: true },
      );

      if (!updatedChannel) {
        return { message: 'Channel not found' };
      }

      return {
        message: 'User successfully deleted from the channel',
        channel: updatedChannel,
      };
    } catch (error) {
      throw new Error('Error deleting user from channel: ' + error.message);
    }
  }
}
