import { Injectable } from '@nestjs/common';

const aws = require('aws-sdk')


const s3 = new aws.S3(
  {
    region: "us-west-2",
    accessKeyId: "AKIA4A76XCCWPVTTVYWG",
    secretAccessKey: "OTlPofRWhW+/+5MaW/WSiMkkigqLWeIA47Rcz16C",
    signatureVersion: 'v4',

  }
)

@Injectable()
export class AppService {
  getHello(): Dummy {
    return ({ name: 'amit' });
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
