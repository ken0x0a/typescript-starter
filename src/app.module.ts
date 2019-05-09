import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BaseMiddleware } from './base.middleware';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ApiModule } from './api/api.module';
import { Auth2Controller } from './auth/auth2.controller';

@Module({
  imports: [AuthModule, ApiModule],
  controllers: [AppController, AuthController, Auth2Controller],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(BaseMiddleware).forRoutes('*');
  }
}
