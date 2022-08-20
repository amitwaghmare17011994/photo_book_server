import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios'

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
  constructor(private readonly httpService: HttpService) { }


  async sendOTPService(phoneNumber: string): Promise<any> {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const options = {
        authorization: process.env.SMS_KEY, message: `Your otp is ${otp}`, numbers: [phoneNumber],
      }
      const res = await fast2sms.sendMessage(options)
      return {res,otp}

    } catch (error) {
      throw error
    }
  }

  async getHello(): Promise<any> {
     
    return {};
  }


  async getSignedURL(fileName: string): Promise<any> {
    return new Promise(async (res, rej) => {
      const params = {
        Bucket: 'photobookbucket',
        Key: fileName,

      }
      const objectUrl = await this.getSignedObjectUrl(params)
      const objectPutUrl = await this.getSignedPutObjectUrl(params)
      return res(objectPutUrl)


    })
  }

  async getSignedObjectUrl(params: any): Promise<any> {
    return new Promise((res, rej) => {
      s3.getSignedUrl('getObject', params, (err, getUrl) => {
        return res(getUrl)
      })
    })
  }

  async getSignedPutObjectUrl(params: any): Promise<any> {
    return new Promise((res, rej) => {
      s3.getSignedUrl('putObject', params, (err, getUrl) => {
        return res(getUrl)
      })
    })
  }
}
