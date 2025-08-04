import { PartialType } from '@nestjs/mapped-types';
import { CreateVoiceUploaderDto } from './create-voice-uploader.dto';

export class UpdateVoiceUploaderDto extends PartialType(CreateVoiceUploaderDto) {}
