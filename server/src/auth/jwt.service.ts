// src/auth/jwt.service.ts
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
    private readonly jwtSecret = process.env.JWT_SECRET;

    signToken(payload: any, expiresIn: string = '1d') {
        return jwt.sign(payload, this.jwtSecret, { expiresIn });
    }

    verifyToken(token: string) {
        return jwt.verify(token, this.jwtSecret);
    }
}
