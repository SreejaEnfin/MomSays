import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Category } from 'src/category/entities/category.entity';
import { TestResponse } from 'src/test-response/entities/test-response.entity';
import { AwsS3Service } from 'src/aws/aws-s3.service';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Category, TestResponse]), AwsModule],
  controllers: [QuestionController],
  providers: [QuestionService, AwsS3Service],
})
export class QuestionModule { }
