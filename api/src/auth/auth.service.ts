import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor (
        private jwtService: JwtService,
        private userService: UserService
    ){}

    async loginOrRegister(userData: any) {
        // Check if user exists
        let user = await this.userService.findOne({ email: userData.email })

        // If user does not exist, register them
        if(!user){
            user = await this.userService.createUser(userData)
        }

        // Create payload and sign token
        const payload = { email: user.email, sub: user.userId }
        const access_token = this.jwtService.sign(payload)

        return { url: `exp://192.168.1.6:8081?${access_token}` }
        
    }
}
