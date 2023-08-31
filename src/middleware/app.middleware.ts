import { Header } from "@nestjs/common";
import { NextFunction } from "express";

export class logger{
   use(req:Request,res:Response,next:NextFunction){

    
    console.log("here middleware");
    

    next();

}
}