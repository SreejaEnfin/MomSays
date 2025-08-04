import { Module } from '@nestjs/common';
import { TestResponseService } from './test-response.service';
import { TestResponseController } from './test-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestResponse } from './entities/test-response.entity';
import { User } from 'src/user/entities/user.entity';
import { TestSet } from 'src/test-set/entities/test-set.entity';
import { Question } from 'src/question/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TestResponse, User, TestSet, Question])],
  controllers: [TestResponseController],
  providers: [TestResponseService],
})
export class TestResponseModule { }
