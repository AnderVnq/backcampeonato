import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { firebaseInitializeApp } from './config/firebase.config';

firebaseInitializeApp()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  await app.listen(3000);
}
bootstrap();
