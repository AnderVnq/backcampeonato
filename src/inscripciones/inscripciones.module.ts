import { Module } from '@nestjs/common';
import { InscripcionesService } from './inscripciones.service';
import { InscripcionesController } from './inscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscripciones } from './entities/inscripcione.entity';
import { CampeonatosModule } from 'src/campeonatos/campeonatos.module';
import { EquiposModule } from 'src/equipos/equipos.module';

@Module({
  imports:[TypeOrmModule.forFeature([Inscripciones]),
  CampeonatosModule,
  EquiposModule
  ],
  controllers: [InscripcionesController],
  providers: [InscripcionesService],
})
export class InscripcionesModule {}
