import {Module} from '@nestjs/common';
import {BrokerController} from "./broker.controller";
import {BrokerService} from "./broker.service";
import {SharesController} from "./shares.controller";
import {SharesService} from "./shares.service";
import {SettingsController} from "./settings.controller";
import {SettingsService} from "./settings.service";
import { AppGateway } from './app.gateway';
import {ReaderService} from "./reader.service";
import {CoursesService} from "./courses.service";

@Module({
    imports: [],
    controllers: [BrokerController, SharesController, SettingsController],
    providers: [BrokerService, SharesService, SettingsService, AppGateway, ReaderService, CoursesService],
})
export class AppModule {
}
