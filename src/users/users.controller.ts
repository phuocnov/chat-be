import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Req, Res, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { SerializedUser } from './types';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
// import { HttpExceptionFilter } from './filters/HttpException.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get('search/:id')
  // @UseFilters(HttpExceptionFilter)
  @UseInterceptors(ClassSerializerInterceptor)
  async searchUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new UserNotFoundException();
    return new SerializedUser(user);
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
