import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {AppconfigurationService} from "./configuration.service"






@Module({
    exports:[AppconfigurationService],
    imports:[ConfigModule.forRoot()],
    providers:[AppconfigurationService]

})

export class AppconfigurationModule{};