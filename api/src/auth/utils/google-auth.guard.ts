import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
    constructor(){
        super({
            accessType: 'offline' // Request the Google OAuth2 server to issue a refresh token along with the access token
        })
    }
}