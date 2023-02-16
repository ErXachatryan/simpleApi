import { Controller, Post, UseGuards, Body, Req } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() req: Request,
  ): Promise<{ access_token: string }> {
    // todo: function return type may be replaced with something nicer
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body() CreateUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    return this.authService.register(CreateUserDto);
  }
}
