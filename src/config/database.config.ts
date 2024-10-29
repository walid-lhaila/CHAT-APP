import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';


export const getMongoConfig = async (
    configService: ConfigService, 
  ): Promise<MongooseModuleOptions> => {
    const uri = configService.get<string>('MONGO_URI');
    console.log('MongoDB URI:', uri); 
    return { uri };
  };