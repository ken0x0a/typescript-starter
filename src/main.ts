import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseInterceptor } from './base.interceptor';
import { LoggingInterceptor } from './logging.interceptor';
import { BaseMiddleware } from './base.middleware';
import { TransformInterceptor } from './transform.interceptor';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { fastify } from './fastify';

async function bootstrap() {
  console.log('before');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastify),
  );
  app.setGlobalPrefix('api');
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
