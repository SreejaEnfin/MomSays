// src/aws/aws-s3.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';
import { VoiceUploader } from 'src/voice-uploader/entities/voice-uploader.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AwsS3Service {
    private s3Client: S3Client;
    private bucket: string;

    constructor(
        private configService: ConfigService,

        @InjectRepository(VoiceUploader)
        private voiceClipRepository: Repository<VoiceUploader>
    ) {
        this.bucket = this.configService.get<string>('AWS_BUCKET_NAME') || '';

        this.s3Client = new S3Client({
            region: this.configService.get<string>('AWS_REGION') || '',
            credentials: {
                accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY') || '',
                secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
            },
        });
    }

    async uploadFile(buffer: Buffer, key: string, mimetype: string) {
        const command = new PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: buffer,
            ContentType: mimetype,
        });

        try {
            await this.s3Client.send(command);
            return { message: 'File uploaded successfully', key };
        } catch (error) {
            console.error('S3 upload error:', error);
            throw new InternalServerErrorException('Failed to upload file to S3');
        }
    }

    async deleteFile(fileName: string) {
        const command = new DeleteObjectCommand({
            Bucket: this.bucket,
            Key: fileName,
        });

        await this.s3Client.send(command);
        return { message: 'File deleted successfully', fileName };
    }
}
