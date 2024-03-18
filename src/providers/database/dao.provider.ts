import { BadRequestException, Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Types } from 'mongoose';
import { RESPONSE_MSG } from 'src/common/responses';
import { RedisService } from '../redis/redis.service';
@Injectable()
export class Dao {
  public ObjectId = Types.ObjectId;
  protected modelName;

  constructor(model: any) {
    this.modelName = model;
  }

  private static moduleRef: ModuleRef;

  // This method will be called once to set the moduleRef
  static setModuleRef(ref: ModuleRef) {
    this.moduleRef = ref;
  }

  // Use this method to get the RedisService instance
  getRedisService(): RedisService {
    if (!Dao.moduleRef) {
      throw new Error('ModuleRef has not been set for Dao');
    }
    return Dao.moduleRef.get(RedisService);
  }

  saveDataInBackground(data: any): Promise<any> {
    return new Promise((resolve) => {
      this.modelName.findOneAndUpdate(data, { $set: data }, { upsert: true, returnNewDocument: true }).then((data: any) => {
        resolve(data);
      });
    });
  }

  async saveData(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .create(data)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[saveData]', JSON.stringify(data), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          // reject(err);
        });
    });
  }

  async getDataById(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findById(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[getDataById]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findOne(query: any, projection: any = {}, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findOne(query, projection, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findOne]', JSON.stringify(query, projection), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findOneAndUpdate(conditions: any, update: any, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findOneAndUpdate(conditions, update, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findOneAndUpdate]', JSON.stringify(conditions), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async updateOne(conditions: any, update: any, options: any = { lean: true }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .updateOne(conditions, update, options)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[updateOne]', JSON.stringify(conditions), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async updateMany(conditions: any, update: any, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      if (options != undefined) {
        options['writeConcern'] = { w: 'majority', wtimeout: 5000 };
      } else {
        options = { writeConcern: { w: 'majority', wtimeout: 5000 } };
      }
      this.modelName
        .updateMany(conditions, update, options)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[updateMany]', JSON.stringify(conditions), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findAll(query: any, projection: any = {}, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .find(query, projection, options)
        .lean()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findAll]', JSON.stringify(query, projection), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findWithPagination(query: any, projection: any = {}, options: any = {}, page = 0, limit = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      const paginationResult: any = { next: false, page: page };
      this.modelName
        .find(query, projection, options)
        .skip((page - 1) * limit)
        .limit(limit + 1)
        .then((data: any) => {
          // resolve(data);
          if (data.length) {
            if (data.length > limit) {
              paginationResult.next = true;
              data.slice(0, data.length - 1);
            } else paginationResult.result = data;
            resolve(paginationResult);
          } else resolve({ next: false, result: [], page: page });
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findWithPagination]', JSON.stringify(query, projection), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findAllPaginated(query: any, projection: any = {}, options: any = {}, page = 0, size = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .find(query, projection, options)
        .skip(page * size)
        .limit(size)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findAllPaginated]', JSON.stringify(query, projection), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async insertMany(data: any, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .insertMany(data, options)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[insertMany]', JSON.stringify(data), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async distinct(path: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .distinct(path)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[distinct]', path, err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async aggregateData(aggregateArray: any, options: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .aggregate(aggregateArray)
        .then((data: any) => {
          if (options) {
            data.options = options;
          }
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[aggregateData]', JSON.stringify(aggregateArray), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async deleteById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findByIdAndRemove(id)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[deleteById]', id, err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async deleteMany(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .deleteMany(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[deleteMany]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async aggregate(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .aggregate(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[aggregate]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findAllCursor(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //return await this.modelName.find(query).lean().cursor();
      this.modelName
        .find(query)
        .lean()
        .cursor()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findAllCursor]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async aggregateCursor(query: any, batchSize: number): Promise<any> {
    return new Promise((resolve, reject) => {
      //return await this.modelName.aggregate(query).cursor({ batchSize: batchSize });
      this.modelName
        .aggregate(query)
        .cursor({ batchSize: batchSize })
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[aggregateCursor]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async vendorFindAllCursor(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //return await this.modelName.find(query).lean().cursor();
      this.modelName
        .find(query)
        .lean()
        .cursor()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[vendorFindAllCursor]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async clientFindAllCursor(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      //return await this.modelName.find(query).lean().cursor();
      this.modelName
        .find(query)
        .lean()
        .cursor()
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[clientFindAllCursor]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async countDocuments(query: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .countDocuments(query)
        .then((data: any) => {
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[countDocuments]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  //---------------------------Redis DAO [start]-----------------------------//

  savaInRedis(modelName: any, data: any) {
    return new Promise((resolve) => {
      try {
        if (
          modelName.modelName == 'users' ||
          modelName.modelName == 'userSessions' ||
          modelName.modelName == 'clientProfiles' ||
          modelName.modelName == 'vendorProfiles'
        ) {
          const redisService = this.getRedisService();
          redisService.insertOrUpdateByIdRedis(data._doc ? data._doc : data);
          resolve(true);
        } else {
          resolve(true);
        }
      } catch (error) {
        resolve(true);
      }
    });
  }

  async deleteInRedis(id: any) {
    return new Promise(async (resolve) => {
      const redisService = this.getRedisService();
      resolve(await redisService.deleteByIdInRedis(id));
    });
  }

  deleteUserSessionWithRedis(query: any, projection: any = {}, options: any = { lean: true, new: true }) {
    return new Promise((resolve, reject) => {
      this.modelName
        .find(query, projection, options)
        .then(async (data: any) => {
          for await (const element of data) {
            await this.deleteById(element._id);
            await this.deleteInRedis(element._id);
          }
          resolve(true);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[deleteUserSession]', JSON.stringify(query), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  

  async saveDataWithRedis(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .create(data)
        .then(async (data: any) => {
          await this.savaInRedis(this.modelName, data);
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[saveData]', JSON.stringify(data), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          // reject(err);
        });
    });
  }

  async findOneAndUpdateWithRedis(conditions: any, update: any, options: any = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findOneAndUpdate(conditions, update, options)
        .lean()
        .then(async (data: any) => {
          await this.savaInRedis(this.modelName, data);
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[findOneAndUpdate]', JSON.stringify(conditions), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
        });
    });
  }

  async updateOneWithRedis(conditions: any, update: any, options: any = { lean: true, new: true }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.modelName
        .findOneAndUpdate(conditions, update, options)
        .then(async (data: any) => {
          await this.savaInRedis(this.modelName, data);
          resolve(data);
        })
        .catch((err: any) => {
          console.error('[MongoDB]', '[updateOne]', JSON.stringify(conditions), err);
          reject(new BadRequestException(RESPONSE_MSG.ERROR));
          //reject(err);
        });
    });
  }

  async findOneWithRedis(query: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const redisService = this.getRedisService();
        if (redisService.isConnected()) {
          const result = await redisService.getJson(typeof query._id === 'object' ? query._id.toString() : query._id);
          if (result) {
            resolve(result);
          } else {
            this.modelName
              .findOne(query)
              .lean()
              .then((data: any) => {
                resolve(data);
                this.savaInRedis(this.modelName, data);
              })
              .catch((err: any) => {
                console.error('[MongoDB]', '[findOneWithRedis]', err);
                reject(new BadRequestException(RESPONSE_MSG.ERROR));
                //reject(err);
              });
          }
        } else {
          this.modelName
            .findOne(query)
            .lean()
            .then((data: any) => {
              resolve(data);
              this.savaInRedis(this.modelName, data);
            })
            .catch((err: any) => {
              console.error('[MongoDB]', '[findOneWithRedis]', err);
              reject(new BadRequestException(RESPONSE_MSG.ERROR));
              //reject(err);
            });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }
  //---------------------------Redis DAO [end]-----------------------------//
}
