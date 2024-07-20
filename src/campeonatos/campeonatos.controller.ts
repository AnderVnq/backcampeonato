import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CampeonatosService } from './campeonatos.service';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';

@Controller('campeonatos')
export class CampeonatosController {
  constructor(private readonly campeonatosService: CampeonatosService) {}

  @Post()
  create(@Body() createCampeonatoDto: CreateCampeonatoDto) {
    return this.campeonatosService.create(createCampeonatoDto);
  }

  @Get()
  findAll() {
    return this.campeonatosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campeonatosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampeonatoDto: UpdateCampeonatoDto) {
    return this.campeonatosService.update(+id, updateCampeonatoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campeonatosService.remove(+id);
  }
}
