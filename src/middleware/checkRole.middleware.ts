import { Request, Response, NextFunction } from 'express';
import { JwtInfo } from '../bo/models/Authen/JwtInfo';
import { ERROR_CODE } from '../consts/ErrorCode';
import { HttpResponse } from '../consts/HttpResponse';
import Log from '../utils/Log';

export const checkRole = (roles: Array<string>) => {
  // eslint-disable-next-line
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload: JwtInfo = <JwtInfo>res.locals.jwtPayload;
      if (roles.includes(jwtPayload.role)) {
        next();
      } else {
        res.status(403).json(new HttpResponse(false, ERROR_CODE.FORBIDDEN));
      }
    } catch (err) {
      Log.error('middleware', 'checkRole', err, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });
      throw err;
    }
  };
};
