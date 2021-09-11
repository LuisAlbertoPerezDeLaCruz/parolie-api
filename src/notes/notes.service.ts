import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note, NoteDocument } from './schemas/note.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeGateway } from '../changes/changes.gateway';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name)
    private noteModel: Model<NoteDocument>,
    private changeGateway: ChangeGateway,
  ) {}
  create(createNoteDto: CreateNoteDto) {
    const newNote = new this.noteModel(createNoteDto);
    this.changeGateway.sendChangeNotification({
      collection: 'notes',
      action: 'create',
      id: newNote._id,
    });
    return newNote;
  }

  findAll() {
    return this.noteModel.find();
  }

  async findByQuery(query: any) {
    const result = await this.noteModel.find(query);
    return result;
  }

  findOne(id: string) {
    return this.noteModel.findById(id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    this.changeGateway.sendChangeNotification({
      collection: 'notes',
      action: 'update',
      id: id,
    });
    return this.noteModel.findByIdAndUpdate(id, updateNoteDto, { new: true });
  }

  remove(id: string) {
    this.changeGateway.sendChangeNotification({
      collection: 'notes',
      action: 'delete',
      id: id,
    });
    return this.noteModel.findByIdAndDelete(id);
  }
}
