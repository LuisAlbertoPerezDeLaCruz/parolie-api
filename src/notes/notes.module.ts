import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';
import { PassportModule } from '@nestjs/passport';
import { ChangeGateway } from '../changes/changes.gateway';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Note.name,
        useFactory: () => {
          const schema = NoteSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
  ],
  controllers: [NotesController],
  providers: [NotesService, ChangeGateway],
})
export class NotesModule {}
