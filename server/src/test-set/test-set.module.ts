import { Module } from '@nestjs/common';
import { TestSetService } from './test-set.service';
import { TestSetController } from './test-set.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestSet } from './entities/test-set.entity';
import { User } from 'src/user/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';
import { UserModule } from 'src/user/user.module';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([TestSet, User, Question]), UserModule, QuestionModule],
  controllers: [TestSetController],
  providers: [TestSetService],
})
export class TestSetModule { }
