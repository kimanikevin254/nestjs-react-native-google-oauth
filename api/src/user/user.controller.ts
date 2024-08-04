import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/utils/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async profile(@Req() req: any) {
        const user = await this.userService.findOne({ userId: req?.user?.userId })
        return user
    }
}
