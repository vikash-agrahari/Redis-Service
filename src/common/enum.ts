export const ENUM = {
  COLLECTIONS: {
    USER: 'users',
    USER_SESSION: 'userSessions',
  },

  USER_PROFILE_STATUS: {
    PENDING: 1,
    ACTIVE: 2,
    BLOCKED: 3,
    DELETED: 4,
  },

  SMS: {
    YOUR_OTP: (otp: string) => 'Your XYZ Verification OTP is ' + otp,
  },
}
