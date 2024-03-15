import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    console.log('');
    console.log('*********************************REQUEST START*************************************');
    console.log(`NEW REQUEST ---> ${req.method} ${req.originalUrl}`);
    console.log('req Type=======>', req.method.toUpperCase());
    console.log('req Path=======>', req.path);
    console.log('req Body=======>', req.body);
    console.log('req Params=====>', req.params);
    console.log('req Query======>', req.query);
    console.log('Authorization======>', req.headers.authorization);
    console.log('IP============>', req.headers.ip);
    console.log('deviceType============>', req.headers.devicetype);
    console.log('deviceToken============>', req.headers.devicetoken);
    console.log('deviceId============>', req.headers.deviceid);
    console.log('TIME============>', new Date());
    console.log('********************************REQUEST ENDS******************************************');
    req.startTime = new Date();
    next();
  }
}
