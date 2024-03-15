import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EntityModule } from 'src/entity/entity.module';
import { REDIS_SESSION, REDIS_TTL } from './redis.provider';
import { RedisService } from './redis.service';

@Module({
  imports: [ConfigModule.forRoot(), EntityModule],
  providers: [REDIS_TTL, REDIS_SESSION, RedisService],
  exports: [RedisService],
})
export class RedisModule {}
