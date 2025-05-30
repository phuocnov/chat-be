import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { ChatMessage } from 'src/chat-messages/entities/chat-message.entity';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Chat,
      ChatMessage
    ])
  ],
  providers: [UsersService, UserRepository],
  exports: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
