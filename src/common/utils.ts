import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export async function generateOtp() {
  return Math.floor(Math.random() * 900000 + 100000).toString();
}