import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isNumber, IsOptional } from "class-validator";
import { string } from "joi";
import {Comment} from "./comment.schema";


export type RestaurantMenuDocument = Menu & Document;
@Schema()
export class Menu{
    @Prop({required:true})
    foodname:string;

    @Prop()
    fooddesc:string;

    @Prop()
    foodtumbnail:string;

    @Prop()
    score:number;

    @Prop()
    price:number;

    @IsOptional()
    comments:[Comment];
    

}

export const RestaurantMenuSchema = SchemaFactory.createForClass(Menu);