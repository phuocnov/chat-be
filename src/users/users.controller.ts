import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('')
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }
  @Get('search/:id')
  async searchUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return user;
  }

  @Post()
  @UsePipes(ValidationPipe)
  async CreateUser(@Body() creteUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(creteUserDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
