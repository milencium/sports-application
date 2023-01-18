import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ClassService } from './class.service';
import {
  CreateClassValidation,
  UpdateClassValidation,
} from './class.validation';

@Controller('classes')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Post('class')
  createClass(@Req() req: Request, @Body() body: CreateClassValidation) {
    const { name, category, description, termin, sportsName } = req.body;

    return this.classService.createClass(
      name,
      category,
      description,
      termin,
      sportsName,
    );
  }

  @Patch('class/:classId')
  updateClass(
    @Req() req: Request,
    @Param('classId', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateClassValidation,
  ) {
    const classId = req.params.classId;
    const { name, category, description, termin } = req.body;

    return this.classService.updateClass(
      classId,
      name,
      category,
      description,
      termin,
    );
  }

  @Get('classes')
  getAllClasses() {
    return this.classService.getAllClasses();
  }

  @Get('class/:classId')
  getClass(
    @Req() req: Request,
    @Param('classId', new ParseUUIDPipe()) id: string,
  ) {
    const classId = req.params.classId;

    return this.classService.getClass(classId);
  }

  @Delete('class/:classId')
  deleteClass(
    @Req() req: Request,
    @Param('classId', new ParseUUIDPipe()) id: string,
  ) {
    const classId = req.params.classId;

    return this.classService.deleteClass(classId);
  }
}
