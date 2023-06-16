import {Controller, Get} from '@nestjs/common';
import {SettingsService} from "./settings.service";

@Controller()
export class SettingsController {
    constructor(private readonly settingsService: SettingsService) {}

    @Get("/getDates")
    getShare(): string {
        return this.settingsService.getDates();
    }
}