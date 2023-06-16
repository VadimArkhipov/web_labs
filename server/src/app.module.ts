import { Module } from '@nestjs/common';
import {AdminController} from "./admin.controller";
import {AdminService} from "./admin.service";
import {StockController} from "./stock.controller";
import {StockService} from "./stock.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";

@Module({
  imports: [],
  controllers: [AdminController, StockController, AuthController, UserController],
  providers: [AdminService, StockService, AuthService, UserService],
})

export class AppModule {}
