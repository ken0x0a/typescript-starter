import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Req,
  Res,
  Next,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { BaseInterceptor } from './base.interceptor';
import { postgraphileHandler } from './config/postgraphile';
import { FastifyRequest as Request, FastifyReply as Response } from 'fastify';

function sleep(second: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, second);
  });
}
interface PostGraphileFakeKoaContext {
  req: Request;
  request: Request;
  res: Response;
  response: { body: string };
}
async function asyncTask({ res, response }: PostGraphileFakeKoaContext) {
  console.log({
    respoBody: response.body,
    status: res.statusCode,
  });
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
  @Get('api')
  async getApi(): Promise<string> {
    await sleep(10000);
    return 'this should never appear';
  }

  @Post('api')
  async postApi(
    @Req() req: Request<any, any>,
    @Res() res: Response<any>,
    // @Next() next: any,
  ): Promise<string> {
    // return postgraphileHandler(req, res);

    console.log({ req, res });
    console.log(req.body);
    // tslint:disable: max-line-length
    /**
     * https://github.com/graphile/postgraphile/blob/d3746988c46c3c62fa0f42e396264dad5e118c8a/src/postgraphile/http/createPostGraphileHttpRequestHandler.ts#L841
     * https://github.com/graphile/postgraphile/blob/d3746988c46c3c62fa0f42e396264dad5e118c8a/src/postgraphile/http/koaMiddleware.ts
     */
    // const ctx: PostGraphileFakeKoaContext = {
    //   req,
    //   res,
    //   request: req,
    //   response: {},
    // } as any;
    // const ctx: PostGraphileFakeKoaContext = {
    //   req: req.raw,
    //   res: res.res,
    //   request: req.raw,
    //   response: {},
    // } as any;
    async function next(err?: Error): Promise<any> {
      console.error(err);
    }

    res.end = body => {
      res.body = body;
    };
    try {
      await postgraphileHandler(req.raw, res, next);
      console.log(res.body);
      // asyncTask(ctx).catch(e => console.error(e));
      console.debug('postApi: called');
    } catch (err) {
      console.error(err);
    }
    // res
    //   .code(201)
    //   .header('Content-Type', 'application/json')
    //   .send(ctx.response.body);
    return res.body;
  }
  @Get('timeout')
  async getTimeoutTest(): Promise<string> {
    await sleep(10000);
    return 'this should never appear';
  }

  @Get('async')
  getWithAsyncTask(): string {
    // asyncTask({} as any).catch(e => console.error(e));
    return 'Async task is on going';
  }

  @Post('hey')
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
