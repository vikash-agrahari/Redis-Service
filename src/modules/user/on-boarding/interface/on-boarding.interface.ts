export interface UserDetails {
  _id: string;
  email: string;
  status?: number;
  password: string;
  mobileStatus: boolean;
  fullName?: string;
}

export interface CreateUserSession {
  userId: string;
  ipAddress?: string;
  deviceType?: number;
  status?: number;
  deviceToken?: string;
}

export interface SessionData {
  id: string;
}
export interface Otp {
  otp: string;
  ExpireTime: Date;
  isVerified: boolean;
}
