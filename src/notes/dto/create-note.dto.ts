import { IsEnum, NotEquals } from 'class-validator';
import { NoteType } from '../../enums/note-type.enum';

export class CreateNoteDto {
  creator?: string;
  to: string;
  message: string;
  @IsEnum(NoteType)
  type: NoteType;
}
