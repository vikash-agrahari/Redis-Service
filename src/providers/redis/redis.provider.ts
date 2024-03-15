import { Redis } from 'ioredis';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export const REDIS_SESSION: Provider = {
  provide: 'REDIS_SESSION',
  useFactory: async (config: ConfigService) => {
    const REDIS_HOST = config.get('REDIS_HOST');
    const REDIS_PORT = config.get('REDIS_PORT');
    const REDIS_INDEX = config.get('REDIS_INDEX_SESSION');

    const client: Redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      db: REDIS_INDEX,
      enableReadyCheck: true,
      retryStrategy: (times: number) => {
        if (times > 2) {
          throw new Error('[Redis] : REDIS_SESSION Unable to connect');
        }
      },
    });

    client.on('error', (err: any) => {
      console.log('[Redis] : REDIS_SESSION', err);
    });

    client.on('connect', () => {
      console.log('[Redis] : REDIS_SESSION Connected');
    });
    return client;
  },
  inject: [ConfigService],
};

export const REDIS_TTL: Provider = {
  provide: 'REDIS_TTL',
  useFactory: async (config: ConfigService) => {
    const REDIS_HOST = config.get('REDIS_HOST');
    const REDIS_PORT = config.get('REDIS_PORT');
    const REDIS_INDEX = config.get('REDIS_INDEX_TTL');

    const client: Redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT,
      db: REDIS_INDEX,
      enableReadyCheck: true,
      retryStrategy: (times: number) => {
        if (times > 2) {
          throw new Error('[Redis] : REDIS_TTL Unable to connect');
        }
      },
    });

    client.on('error', (err: any) => {
      console.log('[Redis] : REDIS_TTL', err);
    });

    client.on('connect', () => {
      console.log('[Redis] : REDIS_TTL Connected');
    });
    return client;
  },
  inject: [ConfigService],
};
