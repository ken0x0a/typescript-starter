import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class BaseMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: () => void) {
    console.log('BaseMiddleware before');
    next();

    console.log('BaseMiddleware after');
    // res.removeHeader('X-Powered-By');
  }
}
