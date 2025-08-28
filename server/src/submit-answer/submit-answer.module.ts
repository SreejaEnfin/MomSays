import { Module } from '@nestjs/common';
import { SubmitAnswerService } from './submit-answer.service';
import { SubmitAnswerController } from './submit-answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubmitAnswer } from './entities/submit-answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubmitAnswer])],
  controllers: [SubmitAnswerController],
  providers: [SubmitAnswerService],
})
export class SubmitAnswerModule { }
