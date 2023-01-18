import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSportValidation {
  @ApiProperty()
  @IsString()
  name: string;
}

export class UpdateSportValidation {
  @ApiProperty()
  @IsString()
  name: string;
}
