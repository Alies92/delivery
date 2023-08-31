import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/User/User.module';
import { UserService } from 'src/User/User.service';
import { AuthService } from './auth.service';
import { jwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [forwardRef(() => UserModule), PassportModule,
  JwtModule.register({
    secret: process.env.jwtPrivateKey 
    })
  ],
providers: [AuthService, LocalStrategy, jwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
