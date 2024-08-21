import { Module } from '@nestjs/common';
import { SancionesService } from './sanciones.service';
import { SancionesController } from './sanciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sancion } from './entities/sancione.entity';
import { JugadoresModule } from 'src/jugadores/jugadores.module';
import { PartidosModule } from 'src/partidos/partidos.module';

@Module({
  imports:[TypeOrmModule.forFeature([Sancion]),

    JugadoresModule,
    PartidosModule

  ],
  controllers: [SancionesController],
  providers: [SancionesService],
})
export class SancionesModule {}
