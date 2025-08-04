import { Test, TestingModule } from '@nestjs/testing';
import { VoiceUploaderController } from './voice-uploader.controller';
import { VoiceUploaderService } from './voice-uploader.service';

describe('VoiceUploaderController', () => {
  let controller: VoiceUploaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VoiceUploaderController],
      providers: [VoiceUploaderService],
    }).compile();

    controller = module.get<VoiceUploaderController>(VoiceUploaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
