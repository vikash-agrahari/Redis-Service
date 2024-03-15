import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { VALIDATION_MSG } from 'src/common/validationMsg';
export class ResendDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId?: string;
}

export class OtpDto extends ResendDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;

  expireTime?: Date;
  isVerified?: boolean;
}
export class CreateOnboardingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8, {
    message: VALIDATION_MSG.PASSWORD_SHORT,
  })
  @MaxLength(16, {
    message: VALIDATION_MSG.PASSWORD_LONG,
  })
  @Matches(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/, {
    message: VALIDATION_MSG.PASSWORD_FORMAT,
  })
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsEmail()
  @IsOptional()
  @Transform((param) => param.value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mobileNo: string;
}

export class LoginDto {
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  mobileNo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
export class DeviceParamsDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  ip: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  platform?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  devicetoken: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  deviceid?: string;
}
