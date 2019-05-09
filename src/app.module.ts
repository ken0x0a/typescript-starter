import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseMiddleware } from './base.middleware';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BaseMiddleware).forRoutes('*');
  }
}
