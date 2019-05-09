import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseInterceptor } from './base.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { BaseMiddleware } from './base.middleware';
import { TransformInterceptor } from './transform.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';

async function bootstrap() {
  console.log('before');
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(
    new BaseInterceptor(),
    new LoggingInterceptor(),
    new TransformInterceptor(),
    new TimeoutInterceptor(),
  );
  // app.use();
  await app.listen(3005);
  console.log('after');
}
bootstrap();
