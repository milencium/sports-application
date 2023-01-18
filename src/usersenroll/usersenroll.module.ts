import { Module } from '@nestjs/common';
import { UsersenrollController } from './usersenroll.controller';
import { UsersenrollService } from './usersenroll.service';

@Module({
  controllers: [UsersenrollController],
  providers: [UsersenrollService]
})
export class UsersenrollModule {}
