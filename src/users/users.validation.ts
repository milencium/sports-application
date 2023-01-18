import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserValidation {
  @ApiProperty()
  @IsString()
  username: string;
}
