import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Channel, ChannelDocument } from "./schemas/channel.schema";
import { CreateChannelDto } from "./dto/createChannel.dto";

@Injectable()
export class ChannelService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
  ) {}

  async CreateChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    const { Title, members, type, badWords, userId } = createChannelDto;

    const newChannel = new this.channelModel({
      Title,
      members,
      type,
      badWords,
      userId,
    });

    try {
      return await newChannel.save();
    } catch (err) {
      console.error("Error creating channel:", err.message);
      throw new Error("Unable to create channel. Please try again.");
    }
  }

  async findAllChannel(): Promise<Channel[]> {
    return await this.channelModel
      .find()
      .populate("members")
      .populate("userId")
      .exec();
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
        return { message: "Channel not found" };
      }

      return {
        message: "User successfully integrated into the channel",
        channel: updatedChannel,
      };
    } catch (error) {
      throw new Error("Error integrating user into channel: " + error.message);
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
      throw new Error("Error updating channel: " + error.message);
    }
  }

  async deleteUserFromChannel(userId: string, channelId: string) {
    try {
      const channel = await this.channelModel.findById(channelId);

      if (!channel) {
        return { message: "Channel not found" };
      }

      const updatedChannel = await this.channelModel.findByIdAndUpdate(
        channelId,
        { $pull: { members: userId } },
        { new: true },
      );

      return {
        message: "User successfully deleted from the channel",
        channel: updatedChannel,
      };
    } catch (error) {
      throw new Error("Error deleting user from channel: " + error.message);
    }
  }

  async GetAllChannelWhereTypeIsPublic() {
    try {
      const channels = await this.channelModel.find({ type: "public" });
      if (channels.length === 0) {
        return { message: "no channel exist" };
      }
      return channels;
    } catch (error) {
      throw new Error("Erreur getting channel: " + error.message);
    }
  }

  async AddBadWords(channelId: string, badWords: string[]) {
    try {
      const channel = await this.channelModel.findByIdAndUpdate(
        channelId,
        { $push: { badWords: { $each: badWords } } },
        { new: true },
      );

      if (!channel) {
        return { message: "Channel not found" };
      }

      return {
        message: "Bad words successfully added to the channel",
        channel: channel,
      };
    } catch (error) {
      throw new Error("Error adding bad words to channel: " + error.message);
    }
  }

  async RemoveBadWords(channelId: string, badWords: string[]) {
    try {
      const channel = await this.channelModel.findById(channelId);

      if (!channel) {
        return { message: "Channel not found" };
      }

      const wordsToRemove = badWords.filter((word) =>
        channel.badWords.includes(word),
      );

      if (wordsToRemove.length === 0) {
        return { message: "this word dosn't exist in table bad words" };
      }

      const updatedChannel = await this.channelModel.findByIdAndUpdate(
        channelId,
        { $pull: { badWords: { $in: wordsToRemove } } },
        { new: true },
      );

      return {
        message: "Bad words successfully removed from the channel",
        channel: updatedChannel,
      };
    } catch (err) {
      throw new Error("Error removing bad words from channel: " + err.message);
    }
  }

  async findChannelByUserId(userId: string): Promise<Channel[]> {
    try {
      const channels = await this.channelModel
        .find({ userId })
        .populate("userId")
        .exec();

      if (!channels || channels.length === 0) {
        throw new Error("No channels found for this user");
      }
      return channels;
    } catch (error) {
      throw new Error("Error getting channels: " + error.message);
    }
  }
}
