import { ClassSerializerInterceptor, forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./User.schema";
import { UserController } from "./User.controller";
import { UserService } from "./User.service";
import { ConfigController } from "../configuration/configuration.controller"
import { APP_INTERCEPTOR } from "@nestjs/core";
import { config } from "process";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "src/auth/auth.module";
// import {CustomInterceptor} from "../helper/CustomInterceptor"




@Module({
    exports: [UserService],
    imports: [forwardRef(()=>AuthModule),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        ConfigModule.forRoot()],
    controllers: [UserController],
    providers: [UserService]

})

export class UserModule { };