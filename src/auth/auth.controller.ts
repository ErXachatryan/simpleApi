import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<{ access_token: string }> {
    // todo: function return type may be replaced with somwthing nicer
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Req() req: Request): Promise<{ access_token: string }> {
    return this.authService.register(req.body);
  }
}
