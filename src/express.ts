import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseInterceptor } from './common/interceptor/base.interceptor';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
// import { BaseMiddleware } from './base.middleware';
// import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';

async function bootstrap() {
  console.log('before');
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.useGlobalInterceptors(
    new BaseInterceptor(),
    new LoggingInterceptor(),
    // new TransformInterceptor(),
    new TimeoutInterceptor(),
  );
  // app.use();
  await app.listen(3005, '0.0.0.0');
  console.log('after');
}
bootstrap();
