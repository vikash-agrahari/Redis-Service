import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { CONSTANT } from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { RESPONSE_DATA, RESPONSE_MSG } from 'src/common/responses';
import { UserEntity } from 'src/entity/user.entity';
import { UserSessionEntity } from 'src/entity/userSession.entity';
import { GuardService } from 'src/guards/guards.service';
import { CreateOnboardingDto, DeviceParamsDto, LoginDto, OtpDto } from './dto/on-boarding.dto';
import { CreateUserSession, UserDetails } from './interface/on-boarding.interface';

@Injectable()
export class UserOnBoardingService {
  constructor(private readonly userEntity: UserEntity, private readonly guardService: GuardService, private readonly userSessionEntity: UserSessionEntity
    ) {}
    

  async signUp(createOnboardingDto: CreateOnboardingDto) {
    const payload = { mobileNo: createOnboardingDto.mobileNo, mobileStatus: true, status: { $ne: ENUM.USER_PROFILE_STATUS.DELETED } };
    const userData = await this.userEntity.findOne(payload);
    if (userData) throw new ConflictException(RESPONSE_DATA.MOBILE_NO_ALREADY_EXIST);

    const otp = CONSTANT.BYPASS_OTP;
    createOnboardingDto.password = this.guardService.hashData(createOnboardingDto.password, CONSTANT.PASSWORD_HASH_SALT);

    const createUser = Object.assign(createOnboardingDto);

    createUser['otp'] = {
      otp: otp,
      expireTime: moment().add(CONSTANT.OTP_EXPIRE_TIME, 'minutes').toDate(),
      isVerified: false,
    };

    const data = await this.userEntity.create(createUser);
    return [RESPONSE_DATA.SUCCESS, { id: data._id }];
  }

  async login(loginDto: LoginDto, deviceParamsDto: DeviceParamsDto) {
    let checkUser: UserDetails;
    checkUser = await this.userEntity.getUserDetails({ mobileNo: loginDto.mobileNo, mobileStatus: true });
    if (!checkUser) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    if (checkUser.password !== this.guardService.hashData(loginDto.password, CONSTANT.PASSWORD_HASH_SALT))
      throw new BadRequestException(RESPONSE_MSG.INVALID_PASSWORD);
    if (checkUser.status == ENUM.USER_PROFILE_STATUS.DELETED) throw new BadRequestException(RESPONSE_MSG.USER_NOT_EXIST);
    await this.userEntity.updateOne({ mobileNo: loginDto.mobileNo }, {});

    await this.userSessionEntity.deleteUserSession({ userId: checkUser._id });

    const payload: CreateUserSession = {
      userId: checkUser?._id,
      ipAddress: deviceParamsDto?.ip,
      status: ENUM.USER_PROFILE_STATUS.ACTIVE,
      deviceToken: deviceParamsDto?.devicetoken,
    };
    const sessionData = await this.userSessionEntity.createUserSession(payload);
    const token = await this.guardService.jwtTokenGeneration({
      type: 'USER_LOGIN',
      sessionId: sessionData.id,
      userId: checkUser._id,
    });
    return [
      RESPONSE_DATA.LOGIN,
      {
        token: token,
        userId: checkUser._id,
      },
    ];
  }

  async verifyOtp(otpDto: OtpDto, deviceParamsDto: DeviceParamsDto) {
    let userData = await this.userEntity.findOne({ _id: otpDto.userId });
    if (userData.mobileStatus) throw new ConflictException(RESPONSE_DATA.MOBILE_NO_ALREADY_EXIST);

    if (userData.otp.otp != otpDto.otp && otpDto.otp != CONSTANT.BYPASS_OTP) {
      throw new BadRequestException(RESPONSE_MSG.INVALID_OTP);
    }

      userData = await this.userEntity.findOneAndUpdateWithRedis(
        { _id: userData._id },
        {
          mobileStatus: true,
          status: ENUM.USER_PROFILE_STATUS.ACTIVE,
          'otp.isVerified': true,
          _id: userData._id,
        },
        {
          new: true,
        }
      );

    const addSessionData: CreateUserSession = {
      userId: userData?._id,
      ipAddress: deviceParamsDto?.ip,
      status: ENUM.USER_PROFILE_STATUS.ACTIVE,
      deviceToken: deviceParamsDto?.devicetoken,
    };

    const sessionData = await this.userSessionEntity.createUserSession(addSessionData);

    const token = await this.guardService.jwtTokenGeneration({
      type: 'USER_LOGIN',
      sessionId: sessionData.id,
      userId: userData._id,
    });

    const deleteQuery = { mobileNo: userData.mobileNo, mobileStatus: false };
    await this.userEntity.deleteMany(deleteQuery);

    return [RESPONSE_DATA.SUCCESS, { token: token }];
  }
}
