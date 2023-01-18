import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserEnrollmentValidation {
  @ApiProperty()
  @IsNumber()
  termin: number;
}
