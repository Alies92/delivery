import { Controller, Get,Post,Delete, HttpCode, Header, Redirect, Param, Res, HttpStatus, HttpException, Body } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  

  
  @Get('async')
  async  findall() {
    // throw new HttpException("Forbidden",HttpStatus.FORBIDDEN);
    throw new HttpException("Internal server error",HttpStatus.INTERNAL_SERVER_ERROR);
  }

  // @Get(':id')
  // findone(@Param('id') userId: string){
  //   // console.log(params.id);
  //   // return `this id is ${params.id}`;
  //   return this.appService.findsingle(userId)
  // }

  @Get('param/:key')
  findkey(@Param('key') key:string,@Res({passthrough:true}) res:Response){
    
    res.status(HttpStatus.OK);
    return({message:`this key is ${key}`});
    // console.log(key);
    // return `this key is ${key}`
  }




 
}
