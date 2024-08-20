import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import { CampeonatosModule } from 'src/campeonatos/campeonatos.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { AuthModule } from 'src/auth/auth.module';



@Module({
  imports:[
    TypeOrmModule.forFeature([Mail]),
    CampeonatosModule,
    UsersModule,
    AuthModule
  ],
  controllers: [MailsController],
  providers: [MailsService],
})
export class MailsModule {}
