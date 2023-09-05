import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppconfigurationModule } from './configuration/configuration.module';
import { AppconfigurationService } from './configuration/configuration.service';
import { logger } from './middleware/app.middleware';
import { UserController } from './User/User.controller';
import { UserModule } from './User/User.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import * as Joi from 'joi';

@Module({
  imports: [UserModule,
    MongooseModule.forRoot(process.env.MONGODB_DB_URI),
    ConfigModule.forRoot({
      isGlobal: true
    }),
    RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(logger)
      .forRoutes(UserController);
  }

}
