import { Test, TestingModule } from '@nestjs/testing';
import { VoiceUploaderService } from './voice-uploader.service';

describe('VoiceUploaderService', () => {
  let service: VoiceUploaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceUploaderService],
    }).compile();

    service = module.get<VoiceUploaderService>(VoiceUploaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
