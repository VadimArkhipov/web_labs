import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    login(@Body() body): string {
        return this.authService.login(body)
    }
}