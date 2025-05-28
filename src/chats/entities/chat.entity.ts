import { ChatMessage } from "src/chat-messages/entities/chat-message.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum EChatType {
  GROUP = 'group',
  PRIVATE = 'private'
}

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: EChatType })
  type: EChatType

  @ManyToMany(() => User, (user) => user.chats)
  users: User[];

  @OneToMany(() => ChatMessage, (message) => message.chat)
  chatMessage: ChatMessage

  constructor(chat: Partial<Chat>) {
    Object.assign(this, chat);
  }
}
