import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ChildAlias } from './entities/child-alias.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, ChildAlias])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }