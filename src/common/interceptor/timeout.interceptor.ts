import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return next
    //   .handle()
    //   .pipe(timeout(1000))
    //   .subscribe(value => console.log(value), err => console.log(err));
    // return next.handle().pipe(timeout(5000, map(data=> {data})));
    return next.handle().pipe(timeout(5000));
  }
}
