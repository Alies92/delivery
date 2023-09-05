import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Req, Request, Response, Res, UseGuards, UsePipes, ValidationPipe, UseInterceptors, Inject, forwardRef, Patch } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { response } from "express";
import { request } from "http";
import { AuthService } from "src/auth/auth.service";
import { JwtAutGuard } from "src/auth/jwt-auth.guard";
import { LocalAuthGuard } from "src/auth/local-auth.guard";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";

import { Role, User } from "./User.schema";
import { UserService } from "./User.service";

interface updatedUser {
  username?: string,
  email?: string
}


class UserDto {
  name: string;
  email: string;
}


@Controller('Users')
export class UserController {
  constructor(private readonly UserService: UserService) { }




  @Post('create')
  async createUser(@Res() response, @Body() user: User) {
    try {

      const newUser = await this.UserService.create(user);
      return response.status(HttpStatus.CREATED).json({
        newUser
      })

    } catch (error) {
      return response.json({ message: error.message });
    }
  }

  async logout() {

  }


  @UseGuards(JwtAutGuard)
  @Put("change")
  async changepass(@Req() request,@Body() body){
    const user=await this.UserService.changepassword(request.user.userId,body);
    return response.json({user})
    

  }




  @Roles(Role.Admin)
  @UseGuards(JwtAutGuard, RolesGuard)
  @Get("/admin/all")
  async fetchAll(@Res() response) {
    const Users = await this.UserService.readAll();
    return response.status(HttpStatus.OK).json({
      Users
    })
  }

  //For the logged in users to get their information
  @UseGuards(JwtAutGuard)
  @Get()
  async fetchown(@Req() req, @Res() response) {

    const User = await this.UserService.readById(req.user.userId);
    return response.status(HttpStatus.OK).json({
      User
    })
  }


  //For admins to access user information
  @Roles(Role.Admin)
  @UseGuards(JwtAutGuard, RolesGuard)
  @Get('/:id')
  async findById(@Res() response, @Param('id') id: string) {
    const User = await this.UserService.readById(id);

    return response.status(HttpStatus.OK).json({
      User
    })
  }

  @Put('/:id')
  async update(@Res() response, @Param('id') id: string, @Body() User: updatedUser) {
    const updatedUser = await this.UserService.update(id, User);
    return response.status(HttpStatus.OK).json({
      updatedUser
    })
  }


  @Roles(Role.Admin)
  @UseGuards(JwtAutGuard, RolesGuard)
  @Delete('/:id')
  async delete(@Res() response, @Param('id') id: string) {
    try {
      const deletedUser = await this.UserService.delete(id);
      return response.status(HttpStatus.OK).json({
        message: "the User has removed"
      })

    } catch (error) {
      return response.json({ message: error.message })
    }
  }
}