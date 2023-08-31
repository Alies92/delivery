import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Date, Document } from "mongoose";
import { type } from "os";
import { Menu } from "./menu.schema";

export type RestaurantDocument = Restaurant & Document;


export enum Role {
    User = 'user',
    Admin = 'admin',
}


@Schema()
export class Restaurant {


    @Prop({required:true})
    @IsString()
    name: string;


    @Prop()
    description: string;

    @IsOptional()
    menu:[Menu];

    @IsOptional()
    ResComments:[Comment]

    @Prop()
    @IsPositive()
    age: number;

    @Prop()
    @IsNotEmpty()
    password: string;

    @IsOptional()
    @Prop({ type: Date, required: true })
    created_at: Date;

    @IsDate()
    @IsOptional()
    updated_at: Date;

    @IsNotEmpty()
    @Prop({ type: String, enum: Role })
    roles: Role;

    // @Prop([String])
    // favoritefood:[string];

}


export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);


