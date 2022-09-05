import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

const aws = require('aws-sdk')
const fast2sms = require('fast-two-sms')


const s3 = new aws.S3(
  {
    region: "us-west-2",
    accessKeyId: "AKIA4A76XCCWPVTTVYWG",
    secretAccessKey: "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",
    signatureVersion: 'v4',

  }
)

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  async verifyOTPSerivce(phoneNumber: string, otp: number): Promise<any> {
    try {
      const existingUserObject = await this.usersRepository.findOneBy({
        phone_number: phoneNumber,
        otp: otp
      })
 
      if (!!existingUserObject) {
        await this.usersRepository.update({ phone_number: phoneNumber }, { ...existingUserObject, is_otp_verified: true ,otp:0,is_loged_in:true})
      }
      return { otpVerified: !!existingUserObject }

    } catch (error) {
       
      return { otpVerified: false }
    }
  }

  async sendOTPService(phoneNumber: string): Promise<any> {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const options = {
        authorization: process.env.SMS_KEY, message: `Your otp is ${otp}`, numbers: [phoneNumber],
      }
      const res = await fast2sms.sendMessage(options)

      const existingUserObject = await this.usersRepository.findOneBy({
        phone_number: phoneNumber
      })
      
 
      if (!existingUserObject) {
        await this.usersRepository.insert({
          phone_number: phoneNumber,
          otp: otp,
          is_otp_verified: false,
          is_loged_in:false
        })
      } else {
        await this.usersRepository.update({ phone_number: phoneNumber }, { ...existingUserObject, otp: otp })
      }

      return { res, otp }

    } catch (error) {
      throw error
    }
  }


}
