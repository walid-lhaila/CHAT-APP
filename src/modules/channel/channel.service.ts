import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Channel, ChannelDocument } from './schemas/channel.schema';
import { CreateChannelDto } from "./dto/createChannel.dto";
import { UpdateChannelDto } from "./dto/updateChannel.dto";



@Injectable()
export class ChannelService {
    
    constructor(@InjectModel(Channel.name) private channelModel: Model<ChannelDocument>) {}


    async create(createChannelDto: CreateChannelDto){

    }

    async findAll(){

    } 

    async findOne(id: string) {

    }

    async update(id: string, updateChannelDto: UpdateChannelDto) {

    }

    async remove(id: string){
        
    }
    
}