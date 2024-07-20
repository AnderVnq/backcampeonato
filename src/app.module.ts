import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
//import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CampeonatosModule } from './campeonatos/campeonatos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { BasesModule } from './bases/bases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables de configuración sean globales
      envFilePath: '.env', // Ruta al archivo .env
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'heaveny2',
      database: 'campeonato_rc',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    CampeonatosModule,
    CategoriasModule,
    BasesModule,
  ],
})
export class AppModule {}
