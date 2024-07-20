import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './categorias.entity';
//import { Bases } from 'src/bases/bases.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Categorias])]
})
export class CategoriasModule {}
