import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from './config/database.config';
import { User, UserSchema } from './modules/user/schemas/user.schema';
import { Channel, ChannelSchema } from './modules/channel/schemas/channel.schema';
import { Message, MessageSchema } from './modules/message/schemas/message.schema';
import { Request, RequestSchema } from './modules/request/schemas/request.schema';
import { Notification, NotificationSchema } from './modules/notification/schemas/notification.schema';
import { Rating, RatingSchema } from './modules/rating/schemas/rating.schema';


@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMongoConfig,
      inject: [ConfigService],
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Channel.name, schema: ChannelSchema },
      { name: Message.name, schema: MessageSchema },
      { name: Request.name, schema: RequestSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: Rating.name, schema: RatingSchema },
    ]),

  ],
})
export class AppModule {}
