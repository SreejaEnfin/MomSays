import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTestSetDto } from './dto/create-test-set.dto';
import { UpdateTestSetDto } from './dto/update-test-set.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TestSet } from './entities/test-set.entity';
import { In, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Question } from 'src/question/entities/question.entity';
import { UserRole } from 'src/utils/enums/role.enum';

@Injectable()
export class TestSetService {

  constructor(
    @InjectRepository(TestSet)
    private testSetRepo: Repository<TestSet>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(Question)
    private questRepo: Repository<Question>
  ) { }

  async create(createTestSetDto: CreateTestSetDto) {
    try {
      const parent = await this.userRepo.findOne({ where: { id: createTestSetDto.parentId } });
      const child = await this.userRepo.findOne({ where: { id: createTestSetDto.childId } });

      if (!parent) {
        throw new NotFoundException('Parent not found');
      }

      if (!child) {
        throw new NotFoundException('Child not found');
      }

      const questions = await this.questRepo.findBy({
        id: In(createTestSetDto.questionIds),
      });

      if (questions.length !== createTestSetDto.questionIds.length) {
        throw new NotFoundException('One or more questions not found');
      }

      const testSet = this.testSetRepo.create({
        name: createTestSetDto.name,
        parent,
        child,
        questions,
        assignedDate: new Date(createTestSetDto.assignedDate),
      });

      const response = await this.testSetRepo.save(testSet);

      if (response) {
        return {
          success: true,
          data: response
        }
      } else {
        throw new BadRequestException("Error in creating TestSet");
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
      const tests = await this.testSetRepo.find();
      if (!tests || tests.length === 0) {
        throw new NotFoundException("No question sets found");
      } else {
        return {
          success: true,
          data: tests
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
      const test = await this.testSetRepo.findOne({ where: { id } });
      if (test) {
        return {
          success: true,
          data: test
        }
      } else {
        throw new BadRequestException("Error in fetching TestSet");
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async update(id: string, updateTestSetDto: UpdateTestSetDto) {
    try {
      const testSet = await this.testSetRepo.findOne({ where: { id } });
      if (testSet) {
        Object.assign(testSet, updateTestSetDto);
        const response = await this.testSetRepo.save(testSet);
        if (response) {
          return {
            success: true,
            data: response
          }
        } else {
          throw new BadRequestException("Issue in updating TestSet");
        }
      } else {
        throw new NotFoundException("TestSet is not found")
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
      const testSet = await this.testSetRepo.findOne({ where: { id } });
      if (testSet) {
        const response = await this.testSetRepo.delete(id);
        if (response) {
          return {
            success: true,
            data: response
          }
        } else {
          throw new BadRequestException("Issue in deleting TestSet");
        }
      } else {
        throw new NotFoundException("TestSet is not found")
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getTestSetsByChild(childId: string) {
    try {
      const response = await this.testSetRepo.find({
        where: {
          child: {
            id: childId
          },
        }, relations: ['question', 'parent', 'child'], order: { assignedDate: 'DESC' }
      });
      if (response) {
        return {
          success: true,
          data: response
        }
      } else {
        throw new BadRequestException("Error in fetching test sets");
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getTestSetsByParent(parentId: string) {
    try {
      const response = await this.testSetRepo.find({
        where: {
          parent: {
            id: parentId
          },
        }, relations: ['question', 'parent', 'child'], order: { assignedDate: 'DESC' }
      });
      if (response) {
        return {
          success: true,
          data: response
        }
      } else {
        throw new BadRequestException("Error in fetching test sets");
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }
}
