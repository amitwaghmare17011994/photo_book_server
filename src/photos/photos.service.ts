import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { Photos } from './entities/photo.entity';

const aws = require('aws-sdk')


const s3 = new aws.S3(
  {
    region: "us-west-2",
    accessKeyId: "AKIA4A76XCCWPVTTVYWG",
    secretAccessKey: "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",
    signatureVersion: 'v4',

  }
)

@Injectable()
export class PhotosService {

  constructor(
    @InjectRepository(Photos)
    private photosRepository: Repository<Photos>,
  ) { }

  create(createPhotoDto: CreatePhotoDto) {
    return 'This action adds a new photo';
  }

  findAll() {
    return this.photosRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }

  async getSignedURL(fileName: string, type: string): Promise<any> {
    return new Promise(async (res, rej) => {
      const params = {
        Bucket: 'photobookbucket',
        Key: fileName,

      }

      // const objectUrl = await this.getSignedObjectUrl(params)
      // const objectPutUrl = await this.getSignedPutObjectUrl(params)
      // console.log(objectUrl)
      await this.photosRepository.insert({
        getUrl: 'amit',
        putUrl: 'amit',
        name: fileName,
        type: type
      })
      return res('amit')
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
