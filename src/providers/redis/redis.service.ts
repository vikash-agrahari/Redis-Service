import { Inject, Injectable, Optional } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';
import { Redis } from 'ioredis';
import { Dao } from '../database/dao.provider';
import mongoose from 'mongoose';

@Injectable()
export class RedisService {
  constructor(
    @Optional() @Inject('REDIS_TTL') private readonly redis: Redis,
    @Optional() @Inject('REDIS_SESSION') private readonly redisSession: Redis,
    private readonly configService: ConfigService,
    private moduleRef: ModuleRef,

  ) {
    Dao.setModuleRef(moduleRef);
  }

  isConnected() {
    return true;
  }
  //------------------------User-Redis-Session-Handling-[START]------------------//

  async insertOrUpdateByIdRedis(data: any) {
    return new Promise(async (resolve) => {
      try {
        const stringData = JSON.stringify(data);
        resolve(await this.redisSession.hset(data._id, data._id, stringData));
      } catch (error) {
        console.error(`we have an error insertOrUpdateByIdRedis ==> ${error}`);
        resolve(true);
      }
    });
  }

  async deleteByIdInRedis(id: any) {
    return new Promise(async (resolve) => {
      try {
        resolve(await this.redisSession.del(id));
      } catch (error) {
        console.error(`we have an error deleteByIdInRedis ==> ${error}`);
        resolve(true);
      }
    });
  }

  async getJson(id: string) {
    return new Promise(async (resolve) => {
      try {
        let result = await this.redisSession.hget(id, id);
        if (result) {
          result = JSON.parse(result);
          this.convertToObjectId(result);
        }
        resolve(result);
      } catch (error) {
        resolve(false);
      }
    });
  }

  isObjectId(str: any) {
    const hexRegExp = /^[0-9a-fA-F]{24}$/;
    return mongoose.Types.ObjectId.isValid(str) && hexRegExp.test(str);
  }

  convertToObjectId(json: any) {
    try {
      if (Array.isArray(json)) {
        for (let i = 0; i < json.length; i++) {
          if (typeof json[i] === 'string' && this.isObjectId(json[i])) {
            json[i] = new mongoose.Types.ObjectId(json[i]);
          } else if (typeof json[i] === 'object') {
            this.convertToObjectId(json[i]); // Recursive call for nested objects/arrays
          }
        }
      } else {
        for (const key in json) {
          if (json.hasOwnProperty(key)) {
            if (typeof json[key] === 'string' && this.isObjectId(json[key])) {
              json[key] = new mongoose.Types.ObjectId(json[key]);
            } else if (typeof json[key] === 'object') {
              this.convertToObjectId(json[key]); // Recursive call for nested objects/arrays
            }
          }
        }
      }
      return json;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  //------------------------User-Redis-Session-Handling-[END]------------------//
}
