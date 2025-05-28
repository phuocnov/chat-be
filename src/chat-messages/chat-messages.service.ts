import { Injectable } from '@nestjs/common';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatMessage } from './entities/chat-message.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ChatMessagesService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>
  ) { }

  create(createChatMessageDto: CreateChatMessageDto) {
    return 'This action adds a new chatMessage';
  }

  findAll() {
    return `This action returns all chatMessages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatMessage`;
  }

  update(id: number, updateChatMessageDto: UpdateChatMessageDto) {
    return `This action updates a #${id} chatMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatMessage`;
  }
}
