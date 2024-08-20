import { Module } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { PuntajesController } from './puntajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Puntaje } from './entities/puntaje.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Puntaje])],
  controllers: [PuntajesController],
  providers: [PuntajesService],
  exports:[TypeOrmModule]
})
export class PuntajesModule {}
