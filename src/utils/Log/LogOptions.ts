import { Request } from 'express';

export interface LogOptions {
  json?: boolean;
  jwtPayload?: any;
  req?: Request;
}
