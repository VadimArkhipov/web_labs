import {Controller, Get} from '@nestjs/common';
import {AdminService} from "./admin.service";

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get("/brokers")
    getBrokers(): string {
        return this.adminService.getBrokers();
    }

}