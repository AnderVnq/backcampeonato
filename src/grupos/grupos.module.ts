import { Module } from '@nestjs/common';
import { GruposService } from './grupos.service';
import { GruposController } from './grupos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupos } from './entities/grupo.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Grupos])],
  controllers: [GruposController],
  providers: [GruposService],
})
export class GruposModule {}
