import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, now } from "mongoose";
import { AuthService } from "src/auth/auth.service";
import { Role } from "../User/User.schema"

import { User, UserDocument } from "./User.schema";
import { log } from "console";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Cache } from 'cache-manager';
const bcrypt = require("bcrypt");


interface updatedUser {
    username?: string,
    email?: string
}

class UserDto {
    name: string;
    email: string;
}

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>,
        @Inject(CACHE_MANAGER) private cacheService: Cache,
    ) { }




    async create(User: User): Promise<User> {

        const Email = User.email;
        const existingUser = await this.UserModel.findOne({
            email: Email
        })
        if (existingUser) {
            throw new Error(`User  already exists.`);
        }

        const hashedPassword = await bcrypt.hash(User.password, 10);
        const newUser = new this.UserModel({
            ...User,
            password: hashedPassword,
            created_at: new Date(),
        });
        return await newUser.save();
    }

    async login(email: string, Password: string): Promise<any> {
        try {
            const user = await this.UserModel.findOne({ email: email });
            if (!user) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);

            }
            const isPasswordMatching = await bcrypt.compare(
                Password,
                user.password
            );
            if (!isPasswordMatching) {
                throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
            }
            user.password = undefined;
            return user;

        } catch (error) {
            console.log(error);
            return null;

        }

    }

    async logout() {

    }

    async changepassword(id, body) {
        const user = await this.UserModel.findById(id).exec();
        const password = await bcrypt.hash(body.password, 10);
        user.password = password;
        await user.save();
        user.password = undefined;
        user.roles = undefined;
        return user;

    }


    async cache(id, data): Promise<any> {
        await this.cacheService.set(id.toString(), data.code);
        const cachedData = await this.cacheService.get(id.toString());
        console.log('data set to cache', cachedData);
    }

    async readAll(): Promise<User[]> {
        return await this.UserModel.find().select('username').select('email').select('-password').exec();
    }

    async readById(id): Promise<User> {

        const user = await this.UserModel.findById(id).exec();

        user.password = undefined;
        user.roles = undefined;
        return user;
    }

    async update(id, User: updatedUser): Promise<updatedUser> {
        const user = await this.UserModel.findByIdAndUpdate(id, User, { new: true });
        user.password = undefined;
        user.roles = undefined;
        return user;
    }

    async delete(id): Promise<any> {
        return await this.UserModel.findByIdAndRemove(id);
    }
}