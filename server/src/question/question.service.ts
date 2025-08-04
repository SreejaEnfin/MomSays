import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question)
  private questionRepo: Repository<Question>) { }

  async create(createQuestionDto: CreateQuestionDto) {
    try {
      const newQuestion = await this.questionRepo.create(createQuestionDto);
      const response = await this.questionRepo.save(newQuestion);
      if (response) {
        return {
          success: true,
          data: response
        }
      } else {
        return {
          success: false,
          message: "Question creation failed"
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async findAll() {
    try {
      const questions = await this.questionRepo.find();
      if (questions) {
        return {
          success: true,
          data: questions
        }
      } else {
        return {
          success: false,
          message: "Error in fetching Questions."
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async findOne(id: string) {
    try {
      const question = await this.questionRepo.findOne({ where: { id } });
      if (question) {
        return {
          success: true,
          data: question
        }
      } else {
        return {
          success: false,
          message: "Question with this id is not available"
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    try {
      const question = await this.questionRepo.findOne({ where: { id } });
      if (!question) {
        return {
          success: false,
          message: "Question with this id is not available"
        }
      } else {
        Object.assign(question, updateQuestionDto);
        const response = await this.questionRepo.save(question);
        if (response) {
          return {
            success: true,
            data: response
          }
        } else {
          return {
            success: false,
            message: "Issue in updating question"
          }
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async remove(id: string) {
    try {
      const question = await this.questionRepo.findOne({ where: { id } });
      if (question) {
        const response = await this.questionRepo.delete(id);
        if (response) {
          return {
            success: true,
            message: "Question deleted successfully"
          }
        } else {
          return {
            success: false,
            message: "Issue in deleting question"
          }
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getQuestionsByCategory(categoryIds: string[]) {
    try {
      const result = await Promise.all(
        categoryIds.map(async (categoryId) => {
          const _questions = await this.questionRepo.find({ where: { categoryId } });
          return { categoryId, questions: _questions };
        })
      );

      const Questions: Record<string, any[]> = {};
      result.forEach(({ categoryId, questions }) => {
        Questions[categoryId] = questions;
      });

      return {
        success: true,
        data: Questions,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  }


}
