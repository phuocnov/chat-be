import { ChatMessage } from "src/chat-messages/entities/chat-message.entity";
import { Chat } from "src/chats/entities/chat.entity";
import { User } from "src/users/entities/user.entity";
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'chat_db',
  synchronize: true,
  entities: [User, Chat, ChatMessage],
  migrations: ['migrations/**']
})
