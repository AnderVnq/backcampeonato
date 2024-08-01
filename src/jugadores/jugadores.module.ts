import { Module } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jugadores } from './entities/jugadore.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Jugadores])],
  controllers: [JugadoresController],
  providers: [JugadoresService],
})
export class JugadoresModule {}
