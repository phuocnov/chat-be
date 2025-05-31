import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './user.repository';
import { SerializedUser } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: UserRepository,
    private readonly entityManager: EntityManager) { }

  async create(createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    await this.entityManager.save(user)
    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(user =>
      new SerializedUser(user));
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }
  async emailExisted(email: string) {
    return await this.userRepository.findByEmail(email) !== null;
  }

  async update(id: number, updateDto: UpdateUserDto) {
    // const user = await this.userRepository.findOneBy({ id });
    // Object.assign(user, updateDto);
    // await this.entityManager.save(user);
    // return user;

    await this.entityManager.transaction(async entityManager => {
      const user = await this.userRepository.findOneBy({ id });
      Object.assign(user, updateDto);
      await entityManager.save(user);
    })
  }
}
