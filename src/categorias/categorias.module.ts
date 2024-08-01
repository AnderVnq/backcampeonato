import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './categorias.entity';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { BasesModule } from 'src/bases/bases.module';

@Module({
    imports:[TypeOrmModule.forFeature([Categorias]),
        BasesModule
    ],
    providers: [CategoriasService],
    controllers: [CategoriasController],
    exports:[CategoriasService]
})
export class CategoriasModule {}
