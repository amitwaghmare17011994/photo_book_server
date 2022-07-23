import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): Dummy {
    return this.appService.getHello();
  }


  @Post('upload')
  async uploadFile(@Body() req: FilePayload): Promise<SignedURLResponse> {
    const res = await this.appService.getSignedURL(req.name)
    return { url: res }
  }
}
