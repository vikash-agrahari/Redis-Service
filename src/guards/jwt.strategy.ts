import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONSTANT } from 'src/common/constant';
import { ENUM } from 'src/common/enum';
import { RESPONSE_MSG } from 'src/common/responses';
// import { UserEntity } from 'src/entity/user.entity';
// import { UserSessionEntity } from '../entity/userSession.entity';

// user Auth Module
@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'userJWT') {
  constructor(
    // private readonly userEntity: UserEntity,
    // private readonly userSessionEntity: UserSessionEntity,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: CONSTANT.JWT_PASSWORD,
    });
  }

  // async validate(payload: { userId: string; sessionId: string }) {
  //   if (payload) {
  //     const [userData, sessionData] = await Promise.all([
  //       this.userEntity.findOneWithRedis({ _id: payload.userId }),
  //       this.userSessionEntity.findOneWithRedis({ _id: payload.sessionId, status: ENUM.USER_PROFILE_STATUS.ACTIVE }),
  //     ]);
  //     if (!sessionData) throw new UnauthorizedException(RESPONSE_MSG.SESSION_EXPIRED);
  //     if (!userData) throw new UnauthorizedException(RESPONSE_MSG.USER_NOT_EXIST);
  //     else if (userData.status == ENUM.USER_PROFILE_STATUS.DELETED) throw new UnauthorizedException(RESPONSE_MSG.USER_NOT_EXIST);
  //   } else throw new UnauthorizedException(RESPONSE_MSG.INVALID_AUTHORIZATION_TOKEN);
  // }
}
