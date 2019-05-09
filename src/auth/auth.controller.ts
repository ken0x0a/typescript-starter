import { Controller, Post, Get, Param } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('login')
  getAny(): string {
    return `Auth Login`;
  }
  @Get('user/:id')
  user(@Param('id') id: string): string {
    return `your id is: ${id}`;
  }
}
