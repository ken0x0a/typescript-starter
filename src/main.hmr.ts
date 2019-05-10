import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './modules/app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { LoggingInterceptor } from './common/interceptor/logging.interceptor'
import * as FastifyMultipart from 'fastify-multipart'

/**
 * https://github.com/nestjs/docs.nestjs.com/issues/103
 */
const fastifyAdapter = new FastifyAdapter()
fastifyAdapter.register(FastifyMultipart)

async function bootstrap() {
  console.log('before')
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, fastifyAdapter)
  // app.setGlobalPrefix('api');
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    // new TransformInterceptor(),
    new TimeoutInterceptor(),
  )
  await app.listen(3007, '0.0.0.0')
  console.log('after')

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}
bootstrap()
