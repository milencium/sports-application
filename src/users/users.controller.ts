import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { UpdateUserValidation } from './users.validation';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Patch('user/:userId')
  updateUser(
    @Req() req: Request,
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserValidation,
  ) {
    const userId = req.params.userId;
    const { username } = req.body;

    return this.usersService.updateUser(userId, username);
  }

  @Get('user/:userId')
  getUser(
    @Req() req: Request,
    @Param('userId', new ParseUUIDPipe()) id: string,
  ) {
    const userId = req.params.userId;

    return this.usersService.getUser(userId);
  }

  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Delete('user/:userId')
  deleteUser(
    @Req() req: Request,
    @Param('userId', new ParseUUIDPipe()) id: string,
  ) {
    const userId = req.params.userId;

    return this.usersService.deleteUser(userId);
  }
}
