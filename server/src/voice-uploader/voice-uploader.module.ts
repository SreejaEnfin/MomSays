import { Module } from '@nestjs/common';
import { VoiceUploaderService } from './voice-uploader.service';
import { VoiceUploaderController } from './voice-uploader.controller';
import { AwsS3Service } from 'src/aws/aws-s3.service';
import { AwsModule } from 'src/aws/aws.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceUploader } from './entities/voice-uploader.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoiceUploader]), AwsModule],
  controllers: [VoiceUploaderController],
  providers: [VoiceUploaderService, AwsS3Service],
  exports: [VoiceUploaderService],
})
export class VoiceUploaderModule { }
