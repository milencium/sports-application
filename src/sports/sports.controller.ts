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
import { SportsService } from './sports.service';
import {
  CreateSportValidation,
  UpdateSportValidation,
} from './sports.validation';

@Controller('sports')
export class SportsController {
  constructor(private sportsService: SportsService) {}

  @Post('sport')
  createSport(@Req() req: Request, @Body() body: CreateSportValidation) {
    const { name } = req.body;

    return this.sportsService.createSport(name);
  }

  @Patch('sport/:sportId')
  updateSport(
    @Req() req: Request,
    @Param('sportId', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateSportValidation,
  ) {
    const sportId = req.params.sportId;
    const { name } = req.body;

    return this.sportsService.updateSport(sportId, name);
  }

  @Get('sports')
  getAllSports() {
    return this.sportsService.getAllSports();
  }
  @Get('sport/:sportId')
  getSport(
    @Req() req: Request,
    @Param('sportId', new ParseUUIDPipe()) id: string,
  ) {
    const sportId = req.params.sportId;

    return this.sportsService.getSport(sportId);
  }

  @Delete('sport/:sportId')
  deleteSport(
    @Req() req: Request,
    @Param('sportId', new ParseUUIDPipe()) id: string,
  ) {
    const sportId = req.params.sportId;

    return this.sportsService.deleteSport(sportId);
  }

  @Get('sports-classes')
  getSportsClasses(@Req() req: Request) {
    const sport: any = req.query.sport;
    const category: any = req.query.category;

    return this.sportsService.getSportsClasses(sport, category);
  }
}
