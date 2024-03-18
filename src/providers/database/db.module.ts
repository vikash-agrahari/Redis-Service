import { Module } from '@nestjs/common';
import { databaseProviders } from './db.provider';
import { RedisService } from '../redis/redis.service';

@Module({
  providers: [...databaseProviders, RedisService],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
