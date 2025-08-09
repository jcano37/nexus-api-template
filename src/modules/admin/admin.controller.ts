import { Controller, Get } from '@nestjs/common';

@Controller({ path: 'admin', version: '1' })
export class AdminController {
  @Get('test')
  getTest(): { status: string } {
    return { status: 'ok' };
  }
}
