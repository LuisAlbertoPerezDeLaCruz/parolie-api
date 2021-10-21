import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

import { Chat, ChatDocument } from './schemas/chat.schema';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChangeGateway } from '../changes/changes.gateway';
import { UsersService } from '../users/users.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name)
    private chatModel: Model<ChatDocument>,
    private changeGateway: ChangeGateway,
    private usersService: UsersService,
  ) {}
  async create(createChatDto: CreateChatDto) {
    createChatDto.read = false;
    createChatDto.dontShow = false;
    const newChat = new this.chatModel(createChatDto);
    await newChat.save();
    this.changeGateway.sendChangeNotification({
      collection: 'chats',
      action: 'create',
      id: newChat._id,
      object: newChat,
    });
    return newChat;
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
    return result;
  }

  async findChatWith(query: any) {
    const user = query.user;
    let ids: any;
    ids = await this.chatModel.distinct('creator', { to: user });
    const more: any = await this.chatModel.distinct('to', {
      creator: user,
    });
    more.forEach((id) => {
      if (!this.idExists(ids, id)) {
        ids.push(id);
      }
    });
    let result: any[] = [];
    let promises: any[] = [];

    ids.forEach(async (id) => {
      console.log({ id });
      const prom = this.usersService
        .findOne(id.toString())
        .then(async (user) => {
          const unreads = await this.chatModel.countDocuments({
            read: false,
            creator: id,
          });
          console.log({ unreads });
          result.push({ user, unreads: unreads });
        });
      promises.push(prom);
    });
    await Promise.all(promises);
    return result;
  }

  findOne(id: string) {
    return this.chatModel.findById(id);
  }

  update(id: string, updateChatDto: UpdateChatDto) {
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

  idExists(array: string[], id: string) {
    let found = false;
    for (let i = 0; i <= array.length - 1; i++) {
      if (array[i].toString() == id.toString()) {
        found = true;
        break;
      }
    }
    return found;
  }
}
