import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUserSession } from 'src/schema/userSession.schema';
import { Dao } from 'src/providers/database/dao.provider';
import { CreateUserSession } from 'src/modules/user/on-boarding/interface/on-boarding.interface';

@Injectable()
export class UserSessionEntity extends Dao {
  constructor(@Inject('USER_SESSION_MODEL') private userSessionModel: Model<IUserSession>) {
    super(userSessionModel);
  }

  async createUserSession(payload: CreateUserSession) {
    return await this.saveDataWithRedis(payload);
  }
  async getUserSessionDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }

  async deleteUserSession(payload: any) {
    return await this.deleteUserSessionWithRedis(payload);
  }
}
