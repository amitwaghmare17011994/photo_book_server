import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post('send_otp')
  async sendOTP(@Body() req: { phoneNumber: string }): Promise<any> {
    try {
      console.log('here');
      
      const response = await this.appService.sendOTPService(req.phoneNumber)
      return { ...response }
    } catch (error) {
      return error
    }
  }


  @Post('upload')
  async uploadFile(@Body() req: FilePayload): Promise<SignedURLResponse> {
    const res = await this.appService.getSignedURL(req.name)
    return { url: res }
  }
}
