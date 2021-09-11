import { PartialType } from '@nestjs/mapped-types';
import { CreateTranslatorProfileDto } from './create-translator-profile.dto';

export class UpdateTranslatorProfileDto extends PartialType(
  CreateTranslatorProfileDto,
) {}
