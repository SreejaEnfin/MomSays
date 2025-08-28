import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TestSetService } from './test-set.service';
import { CreateTestSetDto } from './dto/create-test-set.dto';
import { UpdateTestSetDto } from './dto/update-test-set.dto';
import { AuthGuard } from '@nestjs/passport';
import { UUID } from 'crypto';

@UseGuards(AuthGuard('jwt'))
@Controller('test-set')
export class TestSetController {
  constructor(private readonly testSetService: TestSetService) { }

  @Post()
  create(@Body() createTestSetDto: CreateTestSetDto, @Req() req: any) {
    return this.testSetService.create(createTestSetDto);
  }

  @Get('by-child')
  getTestSetByChild(@Query('testId') testId: string, @Req() req: any) {
    return this.testSetService.getTestSetsByChild(testId);
  }

  @Get('by-parent')
  getTestSetByParent(@Query('parentId') parentId: string) {
    return this.testSetService.getTestSetsByParent(parentId);
  }

  @Get('today/:childId')
  getTodayTestSetForChild(@Param('childId') childId: UUID) {
    return this.testSetService.getTodayTestSetForChild(childId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testSetService.findOne(id);
  }

  @Get()
  findAll() {
    return this.testSetService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTestSetDto: UpdateTestSetDto) {
    return this.testSetService.update(id, updateTestSetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.testSetService.remove(id);
  }
}
