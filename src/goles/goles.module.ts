import { Module } from '@nestjs/common';
import { GolesService } from './goles.service';
import { GolesController } from './goles.controller';

@Module({
  controllers: [GolesController],
  providers: [GolesService],
})
export class GolesModule {}
