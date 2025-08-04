import { Injectable } from "@nestjs/common";
import { ParentLoginDto } from "./dto/parent-login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ChildLoginDto } from "./dto/child-login.dto";
import { AuthJwtService } from "./jwt.service";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private readonly authJwtService: AuthJwtService) { }

    async parentLogin(loginDto: ParentLoginDto) {
        try {
            const { email, password } = loginDto;
            if (!email || !password) {
                return {
                    status: 'error',
                    message: 'Email and password are required for login',
                }
            }
            const user = await this.userRepo.findOne({ where: { email } });
            if (!user) {
                return {
                    status: 'error',
                    message: 'User not found',
                }
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return {
                    status: 'error',
                    message: 'Invalid password',
                }
            }

            const token = await this.authJwtService.signToken({ id: user.id, role: user.role, email: user.email, name: user.name });
            return {
                status: 'success',
                message: 'Login successful',
                data: token,
            }
        } catch (e) {
            return {
                status: 'error',
                message: e.message || 'Failed to login',
            }
        }
    }

    async childLogin(loginDto: ChildLoginDto) {
        try {
            const { alias, role } = loginDto;
            if (!alias) {
                return {
                    status: 'error',
                    message: 'Alias is required for child login',
                }
            }

            const child = await this.userRepo.findOne({
                where: { alias },
            });
            if (!child) {
                return {
                    status: 'error',
                    message: 'Child with this Alias not found',
                }
            }

            const token = this.authJwtService.signToken({ id: child.id, name: child.name, role: child.role, alias: child.alias, parentId: child.parentId, avatar: child.avatar, language: child.language }, '2h');

            return {
                status: 'success',
                message: 'Login successful',
                data: token,
            }

        } catch (e) {
            return {
                status: 'error',
                message: e.message || 'Failed to login',
            }
        }
    }
}