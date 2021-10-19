import { IsEnum, NotEquals } from 'class-validator';
import { ChatType } from '../../enums/chat-type.enum';
export class CreateChatDto {
    creator?: string;
    to: string;
    message: string;
    @IsEnum(ChatType)
    type: ChatType;
    read: boolean;
    dontShow: boolean;
}
