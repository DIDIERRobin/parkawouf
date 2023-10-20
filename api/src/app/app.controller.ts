import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';

@Controller()
export class AppController {
  constructor() {
  }

  @Get()
  catchAll(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'front', 'index.html'));
  }

}
