import {Body, Controller, Delete, Get, Post} from '@nestjs/common';
import {BrokerService} from "./broker.service";
import {BrokerDto} from "./broker.dto";

@Controller()
export class BrokerController {
    constructor(private readonly brokerService: BrokerService) {}

    @Get("/brokers")
    getBrokers(): string {
        return this.brokerService.getBrokers();
    }

    @Post("/setBroker")
    setBroker(@Body() broker): string {
        return this.brokerService.setBroker(broker)
    }

    @Delete("/deleteBroker")
    deleteBroker(@Body() broker: BrokerDto): string {
        return this.brokerService.deleteBroker(broker)
    }
}