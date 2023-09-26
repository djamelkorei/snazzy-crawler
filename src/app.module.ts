import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {HttpModule} from "@nestjs/axios";
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from './documents/documents.module';
import {Document} from "./documents/entities/document.entity";

@Module({
  imports: [
      HttpModule,
      DocumentsModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'djamel',
        password: 'password',
        database: 'postgres',
        entities: [Document],
        synchronize: false,
        logging: true,
      })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
