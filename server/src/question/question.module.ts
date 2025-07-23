import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Category } from 'src/category/entities/category.entity';
import { TestResponse } from 'src/test-response/entities/test-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category, TestResponse])],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule { }
