import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class BaseInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Base Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`Base After... ${Date.now() - now}ms`)));
  }
}
