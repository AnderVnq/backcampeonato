import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constans';
import { Users } from 'src/users/users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './strategies/jwt.strategie';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStorageProvider } from 'src/shared/firebase-storage.provider';

@Module({
  imports:[
    TypeOrmModule.forFeature([Users]),
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      //global: true,
      useFactory: async (configService:ConfigService) => ({
        secret: configService.get<string>(JWT_SECRET),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers:[AuthService,ConfigService,JwtStrategy,FirebaseStorageProvider],
  exports: [PassportModule,JwtModule,AuthService]
})
export class AuthModule {}
