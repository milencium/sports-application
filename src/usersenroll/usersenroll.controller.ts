import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersenrollService } from './usersenroll.service';
import { UserEnrollmentValidation } from './usersenroll.validation';

@Controller('users-enroll')
export class UsersenrollController {
  constructor(private usersEnrollService: UsersenrollService) {}

  @Post('enroll/:userId/:classId')
  enrollUser(
    @Req() req: Request,
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Param('classId', new ParseUUIDPipe()) id2: string,
    @Body() body: UserEnrollmentValidation,
  ) {
    const userId = req.params.userId;
    const classId = req.params.classId;
    const { termin } = req.body;

    return this.usersEnrollService.enrollUser(userId, classId, termin);
  }

  @Post('comment/:enrolledId')
  commentUser(
    @Req() req: Request,
    @Param('enrolledId', new ParseUUIDPipe()) id: string,
  ) {
    const enrolledId = req.params.enrolledId;
    const { comment, rating } = req.body;

    return this.usersEnrollService.commentUser(enrolledId, comment, rating);
  }

  @Delete('unroll/:enrolledId')
  unrollUser(
    @Req() req: Request,
    @Param('enrolledId', new ParseUUIDPipe()) id: string,
  ) {
    const enrolledId = req.params.enrolledId;

    return this.usersEnrollService.unrollUser(enrolledId);
  }

  @Get('comments/:classId')
  getClassComments(
    @Req() req: Request,
    @Param('classId', new ParseUUIDPipe()) id: string,
  ) {
    const classId = req.params.classId;

    return this.usersEnrollService.getClassComments(classId);
  }
}
