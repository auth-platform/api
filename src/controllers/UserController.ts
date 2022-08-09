import { Request, Response, NextFunction } from 'express';
import { Controller, Get, Middleware, Post, Put } from '@overnightjs/core';
import { UserService } from '../services/UserService';
import Log from '../utils/Log';
import { IUser } from '../bo/entities/User';
import { Service } from 'typedi';
import { checkJwt } from '../middleware/checkJwt.middleware';
import { checkRole } from '../middleware/checkRole.middleware';
import { checkPwd } from '../middleware/checkPwd.middleware';
import { HttpResponse } from '../consts/HttpResponse';

@Service()
@Controller('api/user')
export class UserController {
  private className = 'AuthController';
  constructor() { }

  @Get('list')
  private async getListUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'getListUser', `RQ`, { req: req });

    try {
      const service: UserService = new UserService();
      const users = await service.getList();
      res.status(200).json(new HttpResponse(true, users));
    } catch (e) {
      next(e);
    }
  }

  @Get(':id')
  @Middleware([checkJwt, checkRole(['user'])])
  private async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'getUser', `RQ`, { req: req });

    try {
      const id: string = req.params.id;
      const service = new UserService();
      const user = await service.getUserById(id);
      res.status(200).json(new HttpResponse(true, user));
    } catch (e) {
      next(e);
    }
  }

  @Post()
  @Middleware([checkJwt, checkRole(['admin'])])
  private async addUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'addUser', `RQ`, { req: req });

    try {
      // req.body.id = 0;
      const user: IUser = req.body;
      const service = new UserService();
      await service.insert(user);
      res.status(200).json(new HttpResponse(true, null));
    } catch (e) {
      next(e);
    }
  }

  @Put()
  @Middleware([checkJwt, checkRole(['admin'])])
  private async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updateUser', `RQ`, { req: req });

    try {
      const user: IUser = req.body;
      const service = new UserService();
      await service.update(user);
      res.status(200).json(new HttpResponse(true, null));
    } catch (e) {
      next(e);
    }
  }

  @Put()
  @Middleware([checkJwt])
  private async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updateUser', `RQ`, { req: req });

    try {
      const user: IUser = req.body;
      user.id = res.locals.jwtPayload.id;
      const service = new UserService();
      await service.update(user);
      res.status(200).json(new HttpResponse(true, null));
    } catch (e) {
      next(e);
    }
  }

  @Put('pwd')
  @Middleware([checkJwt, checkPwd])
  private async updatePwd(req: Request, res: Response, next: NextFunction): Promise<void> {
    Log.info(this.className, 'updatePwd', `RQ`, { req: req });

    try {
      const service = new UserService();
      await service.updateById(res.locals.jwtPayload.id, {'pwd': req.body.newPwd});
      res.status(200).json(new HttpResponse(true, null));
    } catch (e) {
      next(e);
    }
  }
}
