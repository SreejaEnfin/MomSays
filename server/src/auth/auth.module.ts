import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';

@Module({
    imports: [UserModule], // if you're injecting userRepo
    controllers: [AuthController],
    providers: [AuthService, JwtService],
})
export class AuthModule { }
