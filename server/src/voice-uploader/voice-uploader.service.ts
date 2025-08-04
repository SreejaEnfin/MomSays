import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateVoiceUploaderDto } from './dto/create-voice-uploader.dto';
import { UpdateVoiceUploaderDto } from './dto/update-voice-uploader.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VoiceUploader } from './entities/voice-uploader.entity';
import { Repository } from 'typeorm';
import { AwsS3Service } from 'src/aws/aws-s3.service';

@Injectable()
export class VoiceUploaderService {
  constructor(
    @InjectRepository(VoiceUploader)
    private voiceUploaderRepo: Repository<VoiceUploader>,

    private awsS3Service: AwsS3Service
  ) { }

  async updateOrCreateVoiceClip({ parentId, scenarioCode, file, s3Key }) {
    const existing = await this.voiceUploaderRepo.findOne({ where: { parentId, scenarioCode } });

    if (existing) {
      await this.awsS3Service.deleteFile(existing.fileName);
      await this.awsS3Service.uploadFile(file.buffer, s3Key, file.mimetype);
      existing.fileName = s3Key;
      existing.isDefault = false;
      return await this.voiceUploaderRepo.save(existing);
    } else {
      await this.awsS3Service.uploadFile(file.buffer, s3Key, file.mimetype);
      const newVoice = this.voiceUploaderRepo.create({
        parentId,
        scenarioCode,
        fileName: s3Key,
        isDefault: false,
      });
      return await this.voiceUploaderRepo.save(newVoice);
    }
  }

  async deleteVoiceClip(parentId: string, scenarioCode: string) {
    try {
      const voiceClip = await this.voiceUploaderRepo.findOne({ where: { scenarioCode, parentId } });

      if (!voiceClip) {
        throw new NotFoundException("Voice is not found");
      }

      const dbResponse = await this.voiceUploaderRepo.delete({ id: voiceClip.id });

      if (dbResponse?.affected === 0) {
        throw new BadRequestException("Failed to delete DB record");
      }

      try {
        const awsResponse = await this.awsS3Service.deleteFile(voiceClip.fileName);

        if (awsResponse?.fileName) {
          return {
            success: true,
            message: 'Voice Clip deleted successfully',
          };
        } else {
          console.error('AWS deletion did not return expected response');
          return {
            success: false,
            message: 'Deleted from DB but S3 delete may have failed',
          };
        }
      } catch (awsError) {
        console.error('AWS delete error:', awsError);

        await this.voiceUploaderRepo.save(voiceClip);

        return {
          success: false,
          message: 'S3 delete failed, DB delete rolled back',
        };
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getVoiceFeedbacksByParentId(parentId: string) {
    const feedbacks = await this.voiceUploaderRepo.find({
      where: { parentId: parentId },
      select: ['scenarioCode', 'fileName', 'parentId', 'isDefault'],
    });

    const result: Record<string, string> = {};
    feedbacks.forEach(fb => {
      result[fb.scenarioCode] = fb.fileName;
    });

    return {
      data: result,
      success: true
    }
  }

  async getDefaultVoices() {
    try {
      const response = await this.voiceUploaderRepo.find({ where: { parentId: 'default' }, select: ['scenarioCode', 'fileName', 'parentId', 'isDefault'] });
      if (response) {
        return {
          success: true,
          data: response
        }
      } else {
        throw new NotFoundException("No default voices found")
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }

  async getVoiceFeedbackVoices(parentId: string) {
    try {
      let finalData: VoiceUploader[] = [];
      if (!parentId) {
        throw new BadRequestException("Cannot proceed without parent id");
      }
      const scenarios = ['correct', 'incorrect', 'skip', 'encouragement', 'timeout'];
      for (const scenario of scenarios) {
        const voice = await this.voiceUploaderRepo.find({
          where: { scenarioCode: scenario, parentId: parentId, isDefault: false }
        });

        if (voice.length === 0) {
          const _voice = await this.voiceUploaderRepo.find({
            where: { parentId: 'default', scenarioCode: scenario, isDefault: true }
          });

          if (_voice.length > 0) {
            finalData.push(_voice[0]);
          }
        } else {
          finalData.push(voice[0]);
        }
      }
      return {
        success: true,
        data: finalData
      }
    } catch (e) {
      return {
        success: false,
        message: e.message
      }
    }
  }
}
