import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { ageGroups } from 'src/utils/constants/ageGroups';
import { maxDate } from 'class-validator';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const newCategory = await this.categoryRepo.create(createCategoryDto);
      const response = await this.categoryRepo.save(newCategory);
      if (response) {
        return {
          success: true,
          data: response
        }
      }
    } catch (e) {
      return {
        success: false,
        error: e.message
      }
    }
  }

  async findAll() {
    try {
      const response = await this.categoryRepo.find();
      return {
        success: true,
        data: response
      }
    } catch (e) {
      return {
        success: false,
        error: e.message
      }
    }
  }

  async findOne(id: string) {
    try {
      const response = await this.categoryRepo.findOne({ where: { id: id } });
      if (response) {
        return {
          success: true,
          data: response
        }
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepo.findOne({ where: { id } });
      if (!category) {
        return {
          success: false,
          message: "Category not found"
        }
      } else {
        Object.assign(category, updateCategoryDto);
        const response = await this.categoryRepo.save(category);
        if (response) {
          return {
            success: true,
            data: response
          }
        } else {
          return {
            success: false,
            message: "Issue in updating category"
          }
        }
      }
    }
    catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryRepo.findOne({ where: { id } });
      if (!category) {
        return {
          success: true,
          message: "No such category found."
        }
      } else {
        const response = await this.categoryRepo.delete(id);
        if (response) {
          return {
            success: true,
            message: "Category deleted successfully"
          }
        } else {
          return {
            success: false,
            message: "Issue in deleting Category"
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

  async findByAgeRange() {
    try {
      const categories = await this.categoryRepo.find();
      let groupCategories: Record<string, { id: string, name: string }[]> = {}
      ageGroups.forEach((ageGroup) => {
        const [minAge, maxAge] = ageGroup.split('-').map(Number);
        const ageCategories = categories.filter((category) => category.minAge === minAge && category.maxAge === maxAge).map((category) => ({
          id: category.id,
          name: category.categoryName,
        }));

        groupCategories[ageGroup] = ageCategories;
      })
      return {
        success: true,
        data: groupCategories
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }


}
