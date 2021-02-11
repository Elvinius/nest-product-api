import { ConfigModule } from '@nestjs/config';
import { ConfigService } from 'nestjs-dotenv';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ProductsModule, ConfigModule.forRoot({
    isGlobal: true
  }), MongooseModule.forRoot(new ConfigService().get('MONGO_CONNECTION_STRING'), { useNewUrlParser: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }