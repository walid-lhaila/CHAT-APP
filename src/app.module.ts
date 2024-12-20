import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { getMongoConfig } from "./config/database.config";
import { UserModule } from "./modules/user/user.module";
import { ChannelModule } from "./modules/channel/channel.module";
import { AuthModule } from "./modules/auth/auth.module";
import { RatingModule } from "./modules/rating/rating.module";
import { FriendRequestModule } from "./modules/request/friend-request.module";

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

    UserModule,
    ChannelModule,
    AuthModule,
    RatingModule,
    FriendRequestModule,
  ],
})
export class AppModule {}
