import { BadRequestException, Injectable } from '@nestjs/common';
import { SubmitAnswerDto } from './dto/create-submit-answer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubmitAnswer } from './entities/submit-answer.entity';
import { Repository } from 'typeorm';
import { UpdateSubmitAnswerDto } from './dto/update-submit-answer.dto';

@Injectable()
export class SubmitAnswerService {

  constructor(
    @InjectRepository(SubmitAnswer)
    private submitAnswerRepo: Repository<SubmitAnswer>) { }

  async create(createSubmitAnswerDto: SubmitAnswerDto) {
    try {
      console.log(createSubmitAnswerDto, "create submit answer dto")
      const testAnswer = this.submitAnswerRepo.create({
        testId: createSubmitAnswerDto.testId,
        parentId: createSubmitAnswerDto.parentId,
        childId: createSubmitAnswerDto.childId,
        assignedDateTime: createSubmitAnswerDto.attendedDateTime,
        questions: createSubmitAnswerDto.questions
      });
      console.log(testAnswer, "test Answer")
      const submitResponse = await this.submitAnswerRepo.save(testAnswer);
      console.log(submitResponse, "submit Respone")
      if (submitResponse) {
        return {
          success: true,
          data: submitResponse
        }
      } else {
        throw new BadRequestException("Error in creating Submit Answer response")
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  findAll() {
    return `This action returns all submitAnswer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} submitAnswer`;
  }

  update(id: number, updateSubmitAnswerDto: UpdateSubmitAnswerDto) {
    return `This action updates a #${id} submitAnswer`;
  }

  remove(id: number) {
    return `This action removes a #${id} submitAnswer`;
  }
}
