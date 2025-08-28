import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, BadRequestException, InternalServerErrorException, Query, UseGuards } from '@nestjs/common';
import { VoiceUploaderService } from './voice-uploader.service';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { AwsS3Service } from 'src/aws/aws-s3.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('voice-uploader')
export class VoiceUploaderController {
  constructor(private readonly voiceUploaderService: VoiceUploaderService, private readonly awsS3Service: AwsS3Service) { }

  @Patch(':scenarioCode')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'correct', maxCount: 1 },
    { name: 'incorrect', maxCount: 1 },
    { name: 'timeout', maxCount: 1 },
    { name: 'skip', maxCount: 1 },
    { name: 'encouragement', maxCount: 1 },
  ]))

  async uploadVoice(
    @UploadedFiles() files: Record<string, Express.Multer.File[]>,
    @Body('parentId') parentId: string,
  ) {
    if (!parentId) {
      throw new BadRequestException('Missing parentId in request body.');
    }

    const uploaded: { scenario: string, key: string }[] = [];

    for (const scenario of ['correct', 'incorrect', 'timeout', 'skip', 'encouragement']) {
      const fileArray = files[scenario];
      if (fileArray && fileArray[0]) {
        const file = fileArray[0];
        const s3Key = `voices/${parentId}/${scenario}-${Date.now()}-${file.originalname}`;

        await this.voiceUploaderService.updateOrCreateVoiceClip({
          parentId,
          scenarioCode: scenario,
          file,
          s3Key,
        });

        uploaded.push({ scenario, key: s3Key });
      }
    }

    return { message: 'Upload successful', uploaded };
  }

  @Delete()
  async deleteVoice(@Body('parentId') parentId: string, @Body('scenarioCode') scenarioCode: string) {
    if (!parentId || !scenarioCode) {
      throw new BadRequestException('parentId and scenarioCode are required');
    }

    return this.voiceUploaderService.deleteVoiceClip(parentId, scenarioCode);
  }

  @Get('voices')
  async getVoiceFeedbacks(@Query('parentId') parentId: string) {
    return this.voiceUploaderService.getVoiceFeedbackVoices(parentId);
  }
}
