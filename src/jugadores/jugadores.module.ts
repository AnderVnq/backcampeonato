import { Module } from '@nestjs/common';
import { JugadoresService } from './jugadores.service';
import { JugadoresController } from './jugadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jugadores } from './entities/jugadore.entity';
import { EquiposModule } from 'src/equipos/equipos.module';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  imports:[TypeOrmModule.forFeature([Jugadores]),
    EquiposModule,
    CategoriasModule
  ],
  controllers: [JugadoresController],
  providers: [JugadoresService],
  exports:[JugadoresService]

})
export class JugadoresModule {}
