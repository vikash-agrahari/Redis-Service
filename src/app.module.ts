import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule, Routes } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import configuration from 'config/configuration';
import { LoggerModule } from './logger/logger.module';
import { UserOnBoardingModule } from './modules/user/on-boarding/on-boarding.module';
import { DatabaseModule } from './providers/database/db.module';
import { schemaProviders } from './schema/schema.provider';
import { RedisModule } from './providers/redis/redis.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from 'src/filters/exceptionFilter';

//for routing app path
const routes: Routes = [
  {
    path: '/user',
    children: [
      {
        path: '/onboarding',
        module: UserOnBoardingModule,
      },
    ],
  },
];
@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    ScheduleModule.forRoot(),
   
    RedisModule,
    DatabaseModule,
    LoggerModule,
    RouterModule.register(routes),
    UserOnBoardingModule,
  ],
  providers: [
    ...schemaProviders,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
