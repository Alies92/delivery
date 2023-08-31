import { Injectable, PayloadTooLargeException, Req, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from '../User/User.service'
import * as dotenv from 'dotenv';
dotenv.config();


@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {

    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.jwtPrivateKey
        })
    }

    async validate(@Req() payload: any) {

        const user = await this.userService.readById(payload.sub);
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            userId: payload.sub,
            username: payload.name,
            roles: payload.roles,
        };

    }


}
