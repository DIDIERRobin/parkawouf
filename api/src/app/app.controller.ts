import { Controller, Get, Req, Res } from '@nestjs/common';
import { join } from 'path';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor() {
  }

  @Get()
  catchAll(@Req() req: Request, @Res() res: Response) {
    if (req.path.startsWith('/socket.io')) {
      return;
    }
    const basePath = process.env.NODE_ENV === 'production' ? 'dist' : '';
    const pathToIndexHtml = join(__dirname, basePath, 'front', 'index.html');
    res.sendFile(pathToIndexHtml);
  }

}
