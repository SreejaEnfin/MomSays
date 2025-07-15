import { Injectable } from "@nestjs/common";
import { ParentLoginDto } from "./dto/parent-login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { ChildAlias } from "src/user/entities/child-alias.entity";
import { JwtService } from "./jwt.service";
import * as bcrypt from 'bcrypt';
import { ChildLoginDto } from "./dto/child-login.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,

        @InjectRepository(ChildAlias)
        private readonly childAliasRepo: Repository<ChildAlias>,
        private readonly jwtService: JwtService) { }

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

            const token = await this.jwtService.signToken({ id: user.id, role: user.role, email: user.email, name: user.name });
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
            const { alias } = loginDto;
            if (!alias) {
                return {
                    status: 'error',
                    message: 'Alias is required for child login',
                }
            }
            const childAlias = await this.childAliasRepo.findOne({
                where: { alias },
                relations: ['child'],
            });
            if (!childAlias) {
                return {
                    status: 'error',
                    message: 'Alias not found',
                }
            }
            const child = childAlias.child;
            if (!child) {
                return {
                    status: 'error',
                    message: 'Child not found for the given alias',
                }
            }
            const token = await this.jwtService.signToken({ id: child.id, name: child.name, role: child.role, alias: childAlias.alias });
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