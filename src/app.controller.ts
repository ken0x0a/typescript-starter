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
  @Get('timeout')
  async getTimeoutTest(): Promise<string> {
    const text = await new Promise(resolve => {
      setTimeout(() => {
        resolve('text');
      }, 10000);
    });
    return 'this should never appear' + text;
  }

  @Post('')
  postRoot(): string {
    return 'hey!';
  }

  @Post('post')
  async postPost(@Body() body: any): Promise<string> {
    return `hey! ${JSON.stringify(body, null, 2)}`;
  }
  @Get(':any')
  getAny(@Param('any') path: string): string {
    const res = `you requested ${path}`;
    console.log(res);
    return res;
  }
}
