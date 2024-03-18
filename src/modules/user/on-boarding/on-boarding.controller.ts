import { Body, Controller, Headers, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HttpResponse } from 'src/common/httpResponse';
import { DeviceParamsDto, LoginDto } from 'src/modules/user/on-boarding/dto/on-boarding.dto';
import { CreateOnboardingDto, OtpDto } from './dto/on-boarding.dto';
import { UserOnBoardingService } from './on-boarding.service';

@ApiTags('User OnBoarding')
@Controller('/')
export class UserOnBoardingController {
  constructor(
    private readonly httpResponse: HttpResponse,
    private readonly userOnBoardingService: UserOnBoardingService,
  ) {}

  @Post('/signup')
  @ApiOperation({ summary: 'sign api' })
  async signup(@Body() createOnboardingDto: CreateOnboardingDto, @Res() response: Response) {
    const [status, result] = await this.userOnBoardingService.signUp(createOnboardingDto);
    return this.httpResponse.sendResponse(response, status, result);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login api' })
  async login(@Body() loginDto: LoginDto, @Headers() deviceParamsDto: DeviceParamsDto, @Res() response: Response) {
    const [status, result] = await this.userOnBoardingService.login(loginDto, deviceParamsDto);
    return this.httpResponse.sendResponse(response, status, result);
  }

  @Post('/verify/otp')
  @ApiOperation({ summary: 'verify otp' })
  async verifyOtp(@Body() otpDto: OtpDto, @Headers() deviceParamsDto: DeviceParamsDto, @Res() response: Response) {
    const [status, result] = await this.userOnBoardingService.verifyOtp(otpDto, deviceParamsDto);
    return this.httpResponse.sendResponse(response, status, result);
  }
}
