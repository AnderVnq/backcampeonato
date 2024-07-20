import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bases } from './bases.entity';
//import { Categorias } from 'src/categorias/categorias.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Bases])]
})
export class BasesModule {}
