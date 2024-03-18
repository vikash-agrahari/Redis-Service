import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
