import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { RegistionValidation, LoginValidation } from './auth.validation';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Req() req: Request, @Body() body: RegistionValidation) {
    const { email, username, category, password } = req.body;

    return this.authService.register(email, username, category, password);
  }
  @Get('email-activate')
  emailActivate(@Req() req: Request) {
    const token: any = req.query.token;

    return this.authService.emailActivate(token);
  }

  @Post('login')
  login(@Req() req: Request, @Body() body: LoginValidation) {
    const { email, password } = req.body;

    return this.authService.login(email, password);
  }
}
