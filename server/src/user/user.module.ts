import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChildAlias } from './entities/child-alias.entity';
import { JwtService } from 'src/auth/jwt.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChildAlias])],
  controllers: [UserController],
  providers: [UserService, JwtService],
  exports: [TypeOrmModule], // 👈 export for use in AuthModule
})
export class UserModule { }