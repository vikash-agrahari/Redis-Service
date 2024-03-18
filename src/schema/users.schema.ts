import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import { ENUM } from 'src/common/enum';

export interface IUser extends Document {
  fullName: string;
  email: string;
  mobileNo: number;
  status: number;
  mobileStatus: any;
  token: string;
  password: string;
  otp: any;
}

export const UserSchema = new mongoose.Schema(
  {
    fullName: { type: Schema.Types.String, required: true },
    email: { type: String },
    mobileNo: { type: Schema.Types.String },
    status: { type: Schema.Types.Number, default: ENUM.USER_PROFILE_STATUS.PENDING, required: true },
    mobileStatus: { type: Schema.Types.Boolean, default: false, required: true },
    token: String,
    password: { type: String, required: true },
    otp: {
      otp: Number,
      expireTime: Date,
      isVerified: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: ENUM.COLLECTIONS.USER,
  }
);
