import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TestSetService } from './test-set.service';
import { CreateTestSetDto } from './dto/create-test-set.dto';
import { UpdateTestSetDto } from './dto/update-test-set.dto';

@Controller('test-set')
export class TestSetController {
  constructor(private readonly testSetService: TestSetService) { }

  @Post()
  create(@Body() createTestSetDto: CreateTestSetDto) {
    return this.testSetService.create(createTestSetDto);
  }

  @Get()
  findAll() {
    return this.testSetService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSetService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSetDto: UpdateTestSetDto) {
    return this.testSetService.update(id, updateTestSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSetService.remove(id);
  }

  @Get('by-child')
  getTestSetByChild(@Query('childId') childId: string) {
    return this.testSetService.getTestSetsByChild(childId);
  }

  @Get('by-parent')
  getTestSetByParent(@Query('parentId') parentId: string) {
    return this.testSetService.getTestSetsByParent(parentId);
  }
}
