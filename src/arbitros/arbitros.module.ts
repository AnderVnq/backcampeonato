import { Module } from '@nestjs/common';
import { ArbitrosService } from './arbitros.service';
import { ArbitrosController } from './arbitros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Arbitro } from './entities/arbitro.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Arbitro])],
  controllers: [ArbitrosController],
  providers: [ArbitrosService],
  exports:[ArbitrosService]
})
export class ArbitrosModule {}
