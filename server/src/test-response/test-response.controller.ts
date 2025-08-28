import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TestResponseService } from './test-response.service';
import { SubmitAnswerDto } from 'src/submit-answer/dto/create-submit-answer.dto';

@Controller('test-response')
export class TestResponseController {
  constructor(private readonly testResponseService: TestResponseService) { }

  // @Post('submit-answer')
  // create(@Body() createTestResponseDto: SubmitAnswerDto) {
  //   return this.testResponseService.submitAnswer(createTestResponseDto);
  // }

  // @Get('child/:childId')
  // getResponsesByChild(@Param('childId') childId: string) {
  //   return this.testResponseService.getResponsesByChild(childId)
  // }
}
