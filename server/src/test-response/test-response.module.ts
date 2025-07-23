import { Module } from '@nestjs/common';
import { TestResponseService } from './test-response.service';
import { TestResponseController } from './test-response.controller';

@Module({
  controllers: [TestResponseController],
  providers: [TestResponseService],
})
export class TestResponseModule {}
