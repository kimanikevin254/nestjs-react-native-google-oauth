import { Controller, Get, Req, UseGuards } from '@nestjs/common';
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
    googleAuth(){
        return 'Google auth'
    }

    // User is redirected to this endpoint after consenting
    @Get('google/redirect')
    async googleRedirect(@Req() req){
        return this.authService.loginOrRegister(req?.user)

        console.log('Object received on callback URL', req?.user);
        return 'You will be redirected to this page'
    }
}
