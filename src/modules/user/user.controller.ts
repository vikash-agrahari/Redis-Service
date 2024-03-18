import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { RedisService } from 'src/providers/redis/redis.service';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';

@Controller('')
export class UserController {
  constructor(private readonly redisService: RedisService) {}

  @GrpcMethod('RedisService', 'setUserDetails')
  async setUserDetails(data: { userId: string, userData: string }): Promise<{ status: number; message: string; timestamp: number; data: string; error: string; }> {
    console.log('GRPC setUserDetails payload:', data);
    try {
      await this.redisService.setKeyValue(data.userId, data.userData);
      return {
        status: RESPONSE_DATA.SUCCESS.statusCode, 
        message: RESPONSE_DATA.SUCCESS.message, 
        timestamp: Date.now(),
        data: `Successfully set value for key: ${data.userId}`,
        error: '',
      };
    } catch (error) {
      return {
        status: RESPONSE_DATA.INTERNAL_SERVER_ERROR.statusCode, 
        message: RESPONSE_DATA.INTERNAL_SERVER_ERROR.message, 
        timestamp: Date.now(),
        data: '',
        error: error.message || RESPONSE_MSG.ERROR,
      };
    }
  }

  @GrpcMethod('RedisService', 'getUserDetails')
  async getUserDetails(data: { userId: string }): Promise<{ status: number; message: string; timestamp: number; data: string; error: string; }> {
    console.log('GRPC getUserDetails payload:', data);
    try {
      const value = await this.redisService.getValueByKey(data.userId);
      return {
        status: RESPONSE_DATA.SUCCESS.statusCode, 
        message: RESPONSE_DATA.SUCCESS.message, 
        timestamp: Date.now(),
        data: `Value for key ${data.userId}: ${value}`,
        error: '',
      };
    } catch (error) {
      return {
        status: RESPONSE_DATA.INTERNAL_SERVER_ERROR.statusCode, 
        message: RESPONSE_DATA.INTERNAL_SERVER_ERROR.message, 
        timestamp: Date.now(),
        data: '',
        error: error.message || RESPONSE_MSG.ERROR,
      };
    }
  }
}
