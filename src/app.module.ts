import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Photos } from './photos/entities/photo.entity';
import { PhotosModule } from './photos/photos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { Users } from './entities/users.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [Photos,Users],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false
        }
      }),
      inject: [ConfigService],


    }),
    PhotosModule,

  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]

})
export class AppModule { }
