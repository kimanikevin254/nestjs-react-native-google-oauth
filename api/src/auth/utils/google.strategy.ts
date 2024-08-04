import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(private configService: ConfigService) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CLIENT_CALLBACK_URL,
            scope: ['profile', 'email']
        })
    }

    // Method called when the user consents
    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
    ){
        const { displayName, emails, photos } = profile

        const user = {
            name: displayName,
            email: emails[0].value,
            picture: photos[0].value
        }

        return done(null, user)
    }
}