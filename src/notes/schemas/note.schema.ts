import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type NoteDocument = Note & Document;

@Schema({ timestamps: true, strict: false })
export class Note {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  creator: User | string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  to: User | string;

  @Prop()
  message: string;

  @Prop()
  type: string;

  @Prop()
  read: boolean;

  @Prop()
  dontShow: boolean;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
