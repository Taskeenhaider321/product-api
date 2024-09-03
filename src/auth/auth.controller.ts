import { Controller, Post, Body, Get, Delete, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpAuthDto } from './dto/signup-auth.dto';
import { LoginDto } from './dto/login-auth.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  // [POST] Log into the System: "http://localhost:3000/auth/login"
  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // [POST] Sign up into the System: "http://localhost:3000/auth/sign-up"
  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpAuthDto: SignUpAuthDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpAuthDto);
  }

  // [GET] Get all the Users: "http://localhost:3000/auth/all-users"
  @Get('/all-users')
  getAllUsers(): Promise<{ users: SignUpAuthDto[]; message: string }> {
    return this.authService.getAllUsers();
  }

   // [DELETE] Delete User by Id from the databse: "http://localhost:3000/auth/{id}"
  @Delete('/:id')
  deleteUser(@Param('id') userId: string): Promise<{ message: string }> {
    return this.authService.deleteUser(userId);
  }
}
