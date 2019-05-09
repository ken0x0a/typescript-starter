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

function sleep(second: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, second);
  });
}
async function asyncTask() {
  await sleep(5000);
  console.debug('ran after 5 second');
}
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
    await sleep(10000);
    return 'this should never appear';
  }

  @Get('async')
  getWithAsyncTask(): string {
    asyncTask().catch(e => console.error(e));
    return 'Async task is on going';
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
