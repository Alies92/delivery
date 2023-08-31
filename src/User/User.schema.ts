import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString } from "class-validator";
import { Date, Document } from "mongoose";
import { type } from "os";

export type UserDocument = User & Document;


export enum Role {
    User = 'user',
    Admin = 'admin',
}


@Schema()
export class User {


    @Prop()
    @IsString()
    username: string;


    @Prop()
    @IsEmail()
    email: string;

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


export const UserSchema = SchemaFactory.createForClass(User);
function email() {
    throw new Error("Function not implemented.");
}

