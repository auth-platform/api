import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../services/UserService';
import Log from '../utils/Log';
import { JwtInfo } from '../bo/models/Authen/JwtInfo';
import { ERROR_CODE } from '../consts/ErrorCode';
import { HttpResponse } from '../consts/HttpResponse';

export const checkJwt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    //Check format token
    if (!req.headers.authorization) {
      res.status(401).json(new HttpResponse(false, ERROR_CODE.AUTHOR_FAILED));
      return;
    }
    const authInfo: string[] = req.headers.authorization.split(' ');
    if (authInfo.length !== 2) {
      res.status(401).json(new HttpResponse(false, ERROR_CODE.AUTHOR_FAILED));
      return;
    }

    const [scheme, token] = authInfo;
    if (scheme === 'Bearer' && token) {
      const jwtToken: string = <string>process.env.JWT_SECRET;

      const jwtPayload: JwtInfo = jwt.verify(token, jwtToken) as JwtInfo;
      res.locals.jwtPayload = jwtPayload;
      res.locals.jwtPayload.keyThread = new Date().getTime();

      //Call the next middleware or controller
      next();
    } else {
      res.status(401).json(new HttpResponse(false, ERROR_CODE.AUTHOR_FAILED));
    }
  } catch (error) {
    Log.error('middleware', 'checkJwt', error, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });

    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json(new HttpResponse(false, ERROR_CODE.TOKEN_EXPIRED));
    } else {
      res.status(400).json(new HttpResponse(false, ERROR_CODE.BAD_REQUEST));
    }
  }
};
