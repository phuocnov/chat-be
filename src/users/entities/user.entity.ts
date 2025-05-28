import { Chat } from "src/chats/entities/chat.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToMany(() => Chat, chat => chat.users)
  chats: Chat[];

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
