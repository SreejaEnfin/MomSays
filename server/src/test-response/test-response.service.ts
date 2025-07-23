import { Injectable, NotFoundException } from '@nestjs/common';
import { SubmitAnswerDto } from 'src/submit-answer/dto/create-submit-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestResponse } from './entities/test-response.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { TestSet } from 'src/test-set/entities/test-set.entity';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class TestResponseService {
  constructor(
    @InjectRepository(TestResponse)
    private testResponseRepo: Repository<TestResponse>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(TestSet)
    private testSetRepo: Repository<TestSet>,
    @InjectRepository(Question)
    private questionRepo: Repository<Question>
  ) { }

  async submitAnswer(response: SubmitAnswerDto) {
    try {
      const child = await this.userRepo.findOneBy({ id: response.childId });
      const testSet = await this.testSetRepo.findOneBy({ id: response.testSetId });
      const question = await this.questionRepo.findOneBy({ id: response.questionId });
      if (!child) {
        throw new NotFoundException("Child details not found");
      }

      if (!testSet) {
        throw new NotFoundException("Test Set details not found");
      }

      if (!question) {
        throw new NotFoundException("Question details not found");
      }

      const isCorrect = response.selectedAnswer === question.correctAnswer;

      const newTestResponse = this.testResponseRepo.create({
        child: child,
        testSet: testSet,
        question: question,
        selectedAnswer: response.selectedAnswer,
        isCorrect: isCorrect
      });

      const savedData = await this.testResponseRepo.save(newTestResponse);
      if (savedData) {
        return {
          success: true,
          data: savedData
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getResponsesByChild(childId: string) {
    try {
      const responses = await this.testResponseRepo.find({
        where: {
          child: {
            id: childId
          }
        },
        relations: ['question', 'testSet', 'child'],
        order: {
          attemptedAt: 'DESC'
        }
      });
      if (responses) {
        return {
          success: true,
          data: responses
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }
}
