import { Controller, Get, Redirect, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './utils/google-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
@UseGuards(GoogleAuthGuard)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
    ) {}

    // Displays the Google OAuth page
    @Get('google/login')
    googleAuth(){}

    // User is redirected to this endpoint after consenting
    @Get('google/redirect')
    @Redirect('exp://192.168.1.6:8081')
    async googleRedirect(@Req() req){
        return this.authService.loginOrRegister(req?.user)
    }
}
