import { Body, Controller, HttpCode, HttpStatus, Inject, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthService) { }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  signin(@Body() signInDto: SignUpDto) {
    return this.authService.signIn(signInDto.username, signInDto.password)
  }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

}
