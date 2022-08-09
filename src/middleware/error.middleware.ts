import HttpException from '../exceptions/HttpException';
import { Request, Response, NextFunction } from 'express';
import Log from '../utils/Log';
import { ERROR_CODE } from '../consts/ErrorCode';
import { HttpResponse } from '../consts/HttpResponse';

// eslint-disable-next-line
export const errorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction): void => {
  Log.error('middleware', 'errorHandler', error, { json: true, jwtPayload: res?.locals?.jwtPayload, req: req });
  
  res.status(error.statusCode || 500).json(new HttpResponse(false, error.errCd || ERROR_CODE.SYSTEM_ERROR));
};
