import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Chat } from 'src/chats/entities/chat.entity';
import { ChatMessage } from 'src/chat-messages/entities/chat-message.entity';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Chat,
      ChatMessage
    ])
  ],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService
    },
    UserRepository],
  exports: [],
  controllers: [UsersController]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware)
      .forRoutes({
        path: '*',
        method: RequestMethod.GET, // Apply to all methods (GET, POST, etc.)
      })
  }
}
