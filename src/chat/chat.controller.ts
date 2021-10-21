import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';

@UseGuards(AuthGuard())
@Controller('chats')
export class ChatController {
  constructor(private readonly chatsService: ChatService) {}

  @Post()
  create(@Body() createChatDto: CreateChatDto, @Req() req) {
    createChatDto.creator = req.user._id;
    return this.chatsService.create(createChatDto);
  }

  @Get()
  findAll() {
    return this.chatsService.findAll();
  }

  @Get('findChatWith')
  findChatWith(@Query() query) {
    return this.chatsService.findChatWith(query);
  }

  @Get('findByQuery')
  findByQuery(@Query() query) {
    return this.chatsService.findByQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
    return this.chatsService.update(id, updateChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatsService.remove(id);
  }
}
