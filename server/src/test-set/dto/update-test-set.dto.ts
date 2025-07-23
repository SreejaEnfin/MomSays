import { PartialType } from '@nestjs/mapped-types';
import { CreateTestSetDto } from './create-test-set.dto';

export class UpdateTestSetDto extends PartialType(CreateTestSetDto) {}
