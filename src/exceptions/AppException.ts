import HttpException from './HttpException';

export class BadRequestException extends HttpException {
  constructor(errCd: string, message?: string) {
    super(400, errCd, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(errCd: string, message?: string) {
    super(404, errCd, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(errCd: string, message?: string) {
    super(401, errCd, message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(errCd: string, message?: string) {
    super(403, errCd, message);
  }
}
