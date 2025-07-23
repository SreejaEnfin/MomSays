import { Test, TestingModule } from '@nestjs/testing';
import { TestSetService } from './test-set.service';

describe('TestSetService', () => {
  let service: TestSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TestSetService],
    }).compile();

    service = module.get<TestSetService>(TestSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
