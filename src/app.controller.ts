import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Post('send_otp')
  async sendOTP(@Body() req: { phoneNumber: string }): Promise<any> {
    try {
      const response = await this.appService.sendOTPService(req.phoneNumber)
      return { ...response }
    } catch (error) {
      return error
    }
  }

  @Post('verify_otp')
  async verifyOTP(@Body() req: { phoneNumber: string, otp: number }): Promise<any> {
    try {
      const response = await this.appService.verifyOTPSerivce(req.phoneNumber,req.otp)
      return { ...response }
    } catch (error) {
      return error
    }
  }

}
