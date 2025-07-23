import { Test, TestingModule } from '@nestjs/testing';
import { TestSetController } from './test-set.controller';
import { TestSetService } from './test-set.service';

describe('TestSetController', () => {
  let controller: TestSetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestSetController],
      providers: [TestSetService],
    }).compile();

    controller = module.get<TestSetController>(TestSetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
