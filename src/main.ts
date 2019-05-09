import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseInterceptor } from './base.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { BaseMiddleware } from './base.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new BaseInterceptor(), new LoggingInterceptor());
  // app.use();
  await app.listen(3005);
}
bootstrap();
