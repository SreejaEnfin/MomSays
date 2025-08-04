// src/aws/aws.module.ts
import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceUploader } from 'src/voice-uploader/entities/voice-uploader.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([VoiceUploader])],
    providers: [AwsS3Service],
    exports: [AwsS3Service],
})
export class AwsModule { }
