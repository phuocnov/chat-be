import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { ChatMessage } from 'src/chat-messages/entities/chat-message.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Chat,
      ChatMessage
    ])
  ],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
