import { Controller, Post, UseGuards, Request, Res, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authservice: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req: any, @Res() res: Response) {

        const loginResponse = this.authservice.login(req.user);
        return res.set({ "Access-Control-Expose-headers": "x-access-token" }).set({ 'x-auth-token': (await loginResponse).acces_token }).status(HttpStatus.OK).json({message:"welcome"});
    }





}
