import { AuthenReq } from '../bo/models/Authen/AuthenReq';
import * as jwt from 'jsonwebtoken';
import { BadRequestException, NotFoundException } from '../exceptions/AppException';
import User, { IUser } from '../bo/entities/User';
import { ERROR_CODE } from '../consts/ErrorCode';

export class UserService {
  constructor() {
  }

  public async login(req: AuthenReq): Promise<any> {
    if (!req.email || req.email.trim().length === 0 || !req.pwd || req.pwd.trim().length === 0) {
      throw new BadRequestException(ERROR_CODE.LOGIN_FAILED, 'Email or password is empty');
    }
    const user = await this.getUserByEmailAndPassword(req.email, req.pwd);
      if (user && !user.isNew) {
        const token = jwt.sign({
          id: user.id,
          role: user.role,
        }, <string>process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE });
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          token: token
        };
      }
      throw new BadRequestException(ERROR_CODE.LOGIN_FAILED, 'Email does not exist or password is incorrect');
  }

  public async getUserById(id: string): Promise<any> {
    const user = await User.findById(id).exec();
    if (user) return user;
    throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND, 'User not found');
  }

  public async getUserByIdAndPassword(id: string, pwd: string): Promise<any> {
    const user = await User.findOne({'_id': id, 'pwd': pwd}).exec();
    if (user) return user;
    throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND, 'User not found');
  }

  public async getUserByEmail(email: string): Promise<any> {
    const user = await User.findOne({'email': email}).exec();
    if (user) return user;
    throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND, 'User not found');
  }

  public async getUserByEmailAndPassword(email: string, pwd: string): Promise<any> {
    const user = await User.findOne({'email': email, 'pwd': pwd}).exec();
    if (user) return user;
    throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND, 'User not found');
  }

  public async getList(): Promise<any[]> {
    return await User.find().exec();
  }

  public async insert(user: IUser) {
    try {
      const checkUser = await User.findOne({'email': user.email}).exec();
      if (checkUser) throw new BadRequestException(ERROR_CODE.EMAIL_EXISTS, 'Email has been used');
      const newUser = await User.create(user);
      console.log(newUser);
      console.log(newUser.toJSON());
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async update(user: IUser) {
    const updateUser = await User.findById(user.id);
    if (!updateUser) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND, 'User not found');
    const checkUser = await User.findOne({'email': user.email}).exec();
    if (checkUser && checkUser.id !== user.id)
      throw new BadRequestException(ERROR_CODE.EMAIL_EXISTS, 'Email has been used');
    await updateUser.update(user).exec();
  }

  public async updateById(id: string, data: any) {
    const updateUser = await User.findById(id);
    if (!updateUser) throw new NotFoundException(ERROR_CODE.USER_NOT_FOUND, 'User not found');
    if (data.email) {
      const checkUser = await User.findOne({'email': data.email}).exec();
      if (checkUser && checkUser.id !== id)
        throw new BadRequestException(ERROR_CODE.EMAIL_EXISTS, 'Email has been used');
    }
    await updateUser.update(data).exec();
  }
}
