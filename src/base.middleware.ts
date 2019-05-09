import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class BaseMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    next();

    res.removeHeader('X-Powered-By');
  }
}
