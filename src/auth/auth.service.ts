import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/User/User.service';
import { JwtService } from '@nestjs/jwt'
const bcrypt = require("bcrypt");


@Injectable()
export class AuthService {
    constructor(private  userservice: UserService, private jwtService: JwtService) { }

    async validateUser(email: string, Password: string): Promise<any> {
        try {
            const user = await this.userservice.login(email, Password);
         
            return user;
        } catch (error) {
            console.log(error);

        }
    }


    async login(user: any) {
        const payload = { name: user.username, sub: user._id,roles: user.roles };        
        return {
            acces_token: this.jwtService.sign(payload),
        };

    }
}
