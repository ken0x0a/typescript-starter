import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './logging.interceptor';
import { BaseInterceptor } from './base.interceptor';

// @UseInterceptors(new BaseInterceptor())
// @UseInterceptors(new LoggingInterceptor())
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get(':any')
  getAny(@Param('any') path: string): string {
    return `you requested ${path}`;
  }

  @Post('')
  postRoot(): string {
    return 'hey!';
  }

  @Post('post')
  async postPost(@Body() body: any): Promise<string> {
    return `hey! ${JSON.stringify(body, null, 2)}`;
  }
}
