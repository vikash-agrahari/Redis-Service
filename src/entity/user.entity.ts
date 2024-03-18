import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/schema/users.schema';
import { Dao } from 'src/providers/database/dao.provider';
import { CreateOnboardingDto, LoginDto } from 'src/modules/user/on-boarding/dto/on-boarding.dto';

@Injectable()
export class UserEntity extends Dao {
  constructor(@Inject('USER_MODEL') private userModel: Model<IUser>) {
    super(userModel);
  }

  async getUserById(userId: string) {
    const user = await this.getDataById(userId);
    return user;
  }

  async create(createUserDto: CreateOnboardingDto) {
    const user = await this.saveData(createUserDto);
    return user;
  }

  async login(loginDto: LoginDto): Promise<any> {
    return await this.saveData(loginDto);
  }

  async getUserDetails(payload: any, projection: any = {}) {
    return await this.findOne(payload, projection);
  }

  async updateUser(payload: any, update: any) {
    return await this.updateMany(payload, update);
  }

  async updateUserDetails(_id: string, update: any) {
    return await this.updateOne({ _id }, update);
  }

  async getCount(pipeline: any[]) {
    return await this.aggregateData(pipeline, {});
  }
}
