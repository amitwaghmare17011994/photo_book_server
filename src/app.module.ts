import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photos } from './photos/entities/photo.entity';
import { PhotosModule } from './photos/photos.module';

@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'photobookdatabaseinstance.ctxp4giygkuv.us-west-2.rds.amazonaws.com',
      port: 3306,
      username: 'root',
      password: 'root1234',
      database: 'photobookdatabaseinstance',
      entities: [Photos],
      synchronize: true,
    }),
    PhotosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
