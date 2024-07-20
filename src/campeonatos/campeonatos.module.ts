import { Module } from '@nestjs/common';
import { CampeonatosService } from './campeonatos.service';
import { CampeonatosController } from './campeonatos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campeonatos } from './entities/campeonato.entity';
//import { Categorias } from 'src/categorias/categorias.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Campeonatos])],
  controllers: [CampeonatosController],
  providers: [CampeonatosService],
})
export class CampeonatosModule {}
