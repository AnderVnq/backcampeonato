import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bases } from './bases.entity';
//import { Categorias } from 'src/categorias/categorias.entity';
import { BasesService } from './bases.service';
import { BasesController } from './bases.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Bases])],
    providers: [BasesService],
    controllers: [BasesController],
    exports:[BasesService]
})
export class BasesModule {}
