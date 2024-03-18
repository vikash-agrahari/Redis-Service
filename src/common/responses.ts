import { HttpStatus } from '@nestjs/common';

export const RESPONSE_MSG = {
  SUCCESS: 'Success.',
  ERROR: 'Something went wrong.',
  LOGIN: 'Login Successfully.',
  USER_NOT_EXIST: 'User not exists.',
  INVALID_AUTHORIZATION_TOKEN: 'Invalid authorization token.',
  INVALID_PASSWORD: 'Enter a valid password.',
  INVALID_OTP: 'Incorrect OTP.',
  MOBILE_NO_ALREADY_EXIST: 'Entered Phone number is associated with another account.',
  SESSION_EXPIRED: 'Session Expired.',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
};

export const RESPONSE_DATA = {
  SUCCESS: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.SUCCESS,
  },
  LOGIN: {
    statusCode: HttpStatus.OK,
    message: RESPONSE_MSG.LOGIN,
  },
  MOBILE_NO_ALREADY_EXIST: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.MOBILE_NO_ALREADY_EXIST,
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: HttpStatus.BAD_REQUEST,
    message: RESPONSE_MSG.INTERNAL_SERVER_ERROR,
  },
};
