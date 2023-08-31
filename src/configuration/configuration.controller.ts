import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";




@Controller('config')
export class ConfigController {

    constructor(private readonly configservice: ConfigService) { }

    @Get()
    async Getmessage() {
        const getmessage = this.configservice.get<string>('MONGODB_DB_URI');
        return getmessage;
    }

}