import { PartialType } from '@nestjs/mapped-types';
import { CreateTestResponseDto } from './create-test-response.dto';

export class UpdateTestResponseDto extends PartialType(CreateTestResponseDto) {}
