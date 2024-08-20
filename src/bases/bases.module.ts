import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bases } from './bases.entity';
//import { Categorias } from 'src/categorias/categorias.entity';
import { BasesService } from './bases.service';
import { BasesController } from './bases.controller';
import { FirebaseStorageProvider } from 'src/shared/firebase-storage.provider';

@Module({
    imports:[TypeOrmModule.forFeature([Bases])],
    providers: [BasesService,FirebaseStorageProvider],
    controllers: [BasesController],
    exports:[BasesService,FirebaseStorageProvider]
})
export class BasesModule {}
