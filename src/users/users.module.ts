import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseStorageProvider } from 'src/shared/firebase-storage.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService,FirebaseStorageProvider],
  exports:[UsersService]
  
})
export class UsersModule {}
