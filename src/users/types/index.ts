import { Exclude } from "class-transformer";

export interface User {
  username: string;
  password: string;
  email: string;
}

export class SerializedUser {
  username: string;
  email: string;

  @Exclude()
  password?: string;

  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}

