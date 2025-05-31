import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import { SignUpDto } from './dtos/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async signIn(username: string, password: string) {
    // const user = await this.usersService.findOne(username);
    // if (user?.password !== password) {
    //   throw new UnauthorizedException();
    // }
    // const payload = {
    //   sub: user.id,
    //   username: user.username
    // }
    // return {
    //   access_token: await this.jwtService.signAsync(payload)
    // };
  }
  async signUp(signUpDto: SignUpDto) {
    try {
      if (await this.usersService.emailExisted(signUpDto.email))
        throw new UnauthorizedException('Email already exists');

      const user = await this.usersService.create(signUpDto);


    } catch (error) {
      throw new UnauthorizedException('Sign up failed');
    }

  }
}
