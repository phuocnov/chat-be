import { Module } from '@nestjs/common';
import { ChatMessagesService } from './chat-messages.service';
import { ChatMessagesGateway } from './chat-messages.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChatMessage
    ]),
  ],
  providers: [ChatMessagesGateway, ChatMessagesService],
})
export class ChatMessagesModule { }
