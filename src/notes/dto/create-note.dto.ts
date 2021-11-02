import { IsEnum, NotEquals } from 'class-validator';
import { NoteType } from '../../enums/note-type.enum';
import { MetaData } from '../schemas/metadata.schema';

export class CreateNoteDto {
  creator?: string;
  to: string;
  message: string;
  @IsEnum(NoteType)
  type: NoteType;
  read: boolean;
  dontShow: boolean;
  metadata: MetaData;
}
