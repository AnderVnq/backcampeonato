import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
//import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CampeonatosModule } from './campeonatos/campeonatos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { BasesModule } from './bases/bases.module';
import { EquiposModule } from './equipos/equipos.module';
import { InscripcionesModule } from './inscripciones/inscripciones.module';
import { JugadoresModule } from './jugadores/jugadores.module';
import { GruposModule } from './grupos/grupos.module';
import { PuntajesModule } from './puntajes/puntajes.module';
import { ArbitrosModule } from './arbitros/arbitros.module';
import { PartidosModule } from './partidos/partidos.module';
import { SancionesModule } from './sanciones/sanciones.module';
import { GolesModule } from './goles/goles.module';
import { MailsModule } from './mails/mails.module';
import { join } from 'path';
import {HandlebarsAdapter} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de configuración sean globales
      envFilePath: '.env', // Ruta al archivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST_LOCAL'),
        port: configService.get<number>('DATABASE_PORT_LOCAL'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_LOCAL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: async(config:ConfigService)=>({
          transport:{
            host:config.get('EMAIL_HOST'),
            port:config.get('EMAIL_PORT'),
            secure:false,
            auth:{
              user:config.get('DEFAULT_FROM_EMAIL'),
              pass:config.get('EMAIL_HOST_PASSWORD')
            }
          },
          defaults:{
            from:`"No Reply" < ${config.get('DEFAULT_FROM_EMAIL')}`
          },
          template:{
            dir: join(__dirname,'..', 'dist', 'mails', 'templates'),
            adapter: new HandlebarsAdapter(), // or a different adapter
            options: {
              strict: true,
            },
          }
        }),
        inject: [ConfigService],
      }
    ),
    UsersModule,
    AuthModule,
    CampeonatosModule,
    CategoriasModule,
    BasesModule,
    EquiposModule,
    InscripcionesModule,
    JugadoresModule,
    GruposModule,
    PuntajesModule,
    ArbitrosModule,
    PartidosModule,
    SancionesModule,
    GolesModule,
    MailsModule,
  ],
})
export class AppModule {}
