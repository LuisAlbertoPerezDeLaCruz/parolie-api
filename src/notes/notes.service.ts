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
  async create(createNoteDto: CreateNoteDto) {
    createNoteDto.read = false;
    createNoteDto.dontShow = false;
    const newNote = new this.noteModel(createNoteDto);
    await newNote.save();
    this.changeGateway.sendChangeNotification({
      collection: 'notes',
      action: 'create',
      id: newNote._id,
      object: newNote,
    });
    return newNote;
  }

  findAll() {
    return this.noteModel.find();
  }

  async findByQuery(query: any) {
    if ('any' in query) {
      let any = query.any;
      delete query['any'];
      if (any === 'true') {
        let creator = query.creator;
        let to = query.to;
        let type = query.type;
        query = {
          $or: [
            { creator: creator, to: to },
            { creator: to, to: creator },
          ],
          type: type,
        };
      }
    }
    let result = null;
    try {
      result = await this.noteModel.find(query).sort('-createdAt');
    } catch (error) {
      result = [];
    }
    return result;
  }

  findOne(id: string) {
    return this.noteModel.findById(id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
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
