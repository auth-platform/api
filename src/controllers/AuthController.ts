import { Request, Response, NextFunction } from 'express';
import { Controller, Post } from '@overnightjs/core';
import { UserService } from '../services/UserService';
import { AuthenReq } from '../bo/models/Authen/AuthenReq';
import Log from '../utils/Log';
import { Service } from 'typedi';
import { HttpResponse } from '../consts/HttpResponse';

@Service()
@Controller('api/auth')
export class AuthController {
  private className = 'AuthController';
  constructor() { }

  @Post()
  private async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'login', `RQ`, { req: req });
    try {
      const authenReq: AuthenReq = req.body;
      const service: UserService = new UserService();
      const data = await service.login(authenReq);
      res.status(200).json(new HttpResponse (true, data));
    } catch (e) {
      next(e);
    }
  }
}
