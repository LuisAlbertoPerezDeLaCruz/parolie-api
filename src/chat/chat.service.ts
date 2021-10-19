import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

import { Chat, ChatDocument } from './schemas/chat.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeGateway } from '../changes/changes.gateway';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    private changeGateway: ChangeGateway,
  ) {}
  create(createChatDto: CreateChatDto) {
    createChatDto.read = false;
    createChatDto.dontShow = false;
    const newChat = new this.chatModel(createChatDto);

    this.changeGateway.sendChangeNotification({
      collection: 'chats',
      action: 'create',
      id: newChat._id,
    });
    return newChat.save();
  }

  findAll() {
    return this.chatModel.find();
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
      result = await this.chatModel.find(query).sort('-createdAt');
    } catch (error) {
      result = [];
    }
    console.log({ query });
    return result;
  }

  findOne(id: string) {
    return this.chatModel.findById(id);
  }

  update(id: string, updateChatDto: UpdateChatDto) {
    this.changeGateway.sendChangeNotification({
      collection: 'chats',
      action: 'update',
      id: id,
    });
    return this.chatModel.findByIdAndUpdate(id, updateChatDto, { new: true });
  }

  remove(id: string) {
    this.changeGateway.sendChangeNotification({
      collection: 'chats',
      action: 'delete',
      id: id,
    });
    return this.chatModel.findByIdAndDelete(id);
  }
}
