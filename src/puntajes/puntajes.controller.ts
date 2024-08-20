import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuntajesService } from './puntajes.service';
import { CreatePuntajeDto } from './dto/create-puntaje.dto';
import { UpdatePuntajeDto } from './dto/update-puntaje.dto';

@Controller('puntajes')
export class PuntajesController {
  constructor(private readonly puntajesService: PuntajesService) {}

  @Post()
  create(@Body() createPuntajeDto: CreatePuntajeDto) {
    return this.puntajesService.create(createPuntajeDto);
  }

  @Get()
  findAll() {
    return this.puntajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puntajesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuntajeDto: UpdatePuntajeDto) {
    return this.puntajesService.update(+id, updatePuntajeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puntajesService.remove(+id);
  }
}
