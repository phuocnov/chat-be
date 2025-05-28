import { Chat } from "src/chats/entities/chat.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Chat, { nullable: false })
  chat: Chat;

  @Column()
  text: string;

  @Column()
  mediaUrl: string;

  @ManyToOne(() => User, { nullable: true })
  lastSeenBy: User;

  @ManyToMany(() => User)
  @JoinTable()
  seenBy: User;

  @Column({ type: 'timestamp' })
  lastSeenAt: Date;

  constructor(chatMessage: Partial<ChatMessage>) {
    Object.assign(this, chatMessage)
  }
}
