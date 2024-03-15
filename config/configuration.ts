import { config } from 'dotenv';

const env = process.env.NODE_ENV || false;
if (!env) process.exit(100);

config({ path: `bin/.env.${env}` });

export default () => ({
  PORT: process.env.PORT,
  ENV: process.env.NODE_ENV,
  DB_URL: process.env.URI,
  DB_Name: process.env.DB_NAME,
  MAIL_USERNAME: process.env.MAIL_USERNAME,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_PORT: process.env.MAIL_PORT,
  BASE_URL: process.env.BASE_URL,
  STRIPE_SECRET: process.env.STRIPE_SECRET || '',
  STRIPE_IDENTITY_WEBHOOK_SECRET: process.env.STRIPE_IDENTITY_WEBHOOK_SECRET,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_KEY_SECRET: process.env.AWS_S3_KEY_SECRET,
  S3_REGION: process.env.S3_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  S3_FOLDER: process.env.S3_FOLDER,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  ADMIN_PASSWORD: process.env.PASSWORD,
  ADMIN_NAME: process.env.ADMIN_NAME,
  ADMIN_COUNTRY_CODE: process.env.ADMIN_COUNTRY_CODE,
  ADMIN_MOBILE_NO: process.env.MOBILE_NO,
  PRIMARY_SERVICE_COMMISSION: process.env.PRIMARY_SERVICE_COMMISSION,
  EXTRA_SERVICE_COMMISSION: process.env.EXTRA_SERVICE_COMMISSION,
  PLATFORM_COMMISSION: process.env.PLATFORM_COMMISSION,
  STRIPE_CHARGES: process.env.STRIPE_CHARGES,
  STRIPE_TRANSACTION_CHARGES: process.env.STRIPE_TRANSACTION_CHARGES,
  SCH_REMINDER_TTL: process.env.SCH_REMINDER_TTL,
  FIRST_IN_REMINDER_TTL: process.env.FIRST_IN_REMINDER_TTL,
  SECOND_IN_REMINDER_TTL: process.env.SECOND_IN_REMINDER_TTL,
  THIRD_IN_REMINDER_TTL: process.env.THIRD_IN_REMINDER_TTL,
  DEBUG: process.env.DEBUG,
});
