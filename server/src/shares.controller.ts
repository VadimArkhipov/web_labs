import {Controller, Get, Param} from '@nestjs/common';
import {SharesService} from "./shares.service";

@Controller()
export class SharesController {
    constructor(private readonly sharesService: SharesService) {}

    @Get("/share/:company")
    getShare(@Param("company") company: string): string {
        return this.sharesService.getShare(company);
    }
}