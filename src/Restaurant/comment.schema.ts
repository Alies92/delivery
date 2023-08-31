import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { isNumber, IsOptional } from "class-validator";
import { string } from "joi";


export type CommentDocument = Comment & Document;
@Schema()
export class Comment{
    @Prop({required:true})
    user:string;

    @Prop()
    text:string;

  

    @Prop()
    score:number;

   

    

}

export const CommentSchema = SchemaFactory.createForClass(Comment);