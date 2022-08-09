import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { ERROR_CODE } from '../consts/ErrorCode';
import { HttpResponse } from '../consts/HttpResponse';
import { UserService } from '../services/UserService';
import Log from '../utils/Log';

export const checkPwd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = new UserService();
    await service.getUserByIdAndPassword(res.locals.jwtPayload.id, req.body.pwd);
    next();
  } catch (error: any) {
    Log.error('middleware', 'checkPwd', error, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });

    if (error.errCd === ERROR_CODE.USER_NOT_FOUND) {
      res.status(400).json(new HttpResponse(false, ERROR_CODE.WRONG_PWD));
    } else {
      throw error;
    }
  }
};
