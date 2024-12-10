import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { firebaseInitializeApp } from './config/firebase.config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

firebaseInitializeApp()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    // origin: 'http://127.0.0.1:4200/', // Cambia esto al origen de tu aplicación Angular
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true,
  };
  app.enableCors(),
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
