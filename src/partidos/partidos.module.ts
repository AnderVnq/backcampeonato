import { Module } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { PartidosController } from './partidos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partido } from './entities/partido.entity';
import { CampeonatosModule } from 'src/campeonatos/campeonatos.module';
import { EquiposModule } from 'src/equipos/equipos.module';
import { ArbitrosModule } from 'src/arbitros/arbitros.module';
import { PuntajesModule } from 'src/puntajes/puntajes.module';
import { InscripcionesModule } from 'src/inscripciones/inscripciones.module';

@Module({
  imports:[TypeOrmModule.forFeature([Partido]),

  CampeonatosModule,
  EquiposModule,
  ArbitrosModule,
  PuntajesModule,
  InscripcionesModule

  ],
  controllers: [PartidosController],
  providers: [PartidosService],
  exports:[PartidosService]
})
export class PartidosModule {}
