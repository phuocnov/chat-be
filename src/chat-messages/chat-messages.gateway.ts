import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { ChatMessagesService } from './chat-messages.service';
import { CreateChatMessageDto } from './dto/create-chat-message.dto';
import { UpdateChatMessageDto } from './dto/update-chat-message.dto';
import { Server } from 'socket.io'

@WebSocketGateway()
export class ChatMessagesGateway {
  constructor(private readonly chatMessagesService: ChatMessagesService) { }

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id)
      console.log('Connected')
    })
  }

  @SubscribeMessage('createChatMessage')
  create(@MessageBody() createChatMessageDto: CreateChatMessageDto) {
    return this.chatMessagesService.create(createChatMessageDto);
  }

  @SubscribeMessage('findAllChatMessages')
  findAll() {
    return this.chatMessagesService.findAll();
  }

  @SubscribeMessage('findOneChatMessage')
  findOne(@MessageBody() id: number) {
    return this.chatMessagesService.findOne(id);
  }

  @SubscribeMessage('updateChatMessage')
  update(@MessageBody() updateChatMessageDto: UpdateChatMessageDto) {
    return this.chatMessagesService.update(updateChatMessageDto.id, updateChatMessageDto);
  }

  @SubscribeMessage('removeChatMessage')
  remove(@MessageBody() id: number) {
    return this.chatMessagesService.remove(id);
  }
}
