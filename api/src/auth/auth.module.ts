import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './utils/google.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  imports: [
    UserModule, 
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    })
  ]
})
export class AuthModule {}
