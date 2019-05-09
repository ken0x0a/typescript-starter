import { Controller, Post, Get, Param } from '@nestjs/common';

@Controller('auth')
export class Auth2Controller {
  @Get('login2')
  getAny(): string {
    return `Auth Login2`;
  }
  @Get('user2/:id')
  user(@Param('id') id: string): string {
    return `your id is: ${id}`;
  }
}
