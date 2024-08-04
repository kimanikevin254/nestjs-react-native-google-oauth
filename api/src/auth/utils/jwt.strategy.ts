import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // Delegates the responsibility of ensuring that a JWT has not expired to the Passport module
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload: any){
        return { userId: payload.sub, email: payload.email }
    }
}