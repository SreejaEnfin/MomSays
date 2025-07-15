import { Body, Controller, Post } from "@nestjs/common";
import { ParentLoginDto } from "./dto/parent-login.dto";
import { AuthService } from "./auth.service";
import { ChildLoginDto } from "./dto/child-login.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('parent-login')
    async parentLogin(@Body() loginDto: ParentLoginDto) {
        return this.authService.parentLogin(loginDto);
    }

    @Post('child-login')
    async childLogin(@Body() loginDto: ChildLoginDto) {
        return this.authService.childLogin(loginDto);
    }
}