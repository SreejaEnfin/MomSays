import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthJwtService {
    constructor(private readonly jwtService: JwtService) { }

    async signToken(payload: any, expiresIn = '1d') {
        try {
            const token = await this.jwtService.signAsync(payload, { secret: process.env.JWT_SECRET, expiresIn });
            return token;
        } catch (error) {
            throw new Error(`Token generation failed: ${error.message}`);
        }
    }

    verifyToken(token: string) {
        try {
            return this.jwtService.verify(token);
        } catch (e) {
            throw e;
        }
    }
}
