import { PartialType } from '@nestjs/mapped-types';
import { SubmitAnswerDto } from './create-submit-answer.dto';

export class UpdateSubmitAnswerDto extends PartialType(SubmitAnswerDto) { }
