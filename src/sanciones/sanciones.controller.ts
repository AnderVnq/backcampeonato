import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SancionesService } from './sanciones.service';
import { CreateSancioneDto } from './dto/create-sancione.dto';
import { UpdateSancioneDto } from './dto/update-sancione.dto';

@Controller('sanciones')
export class SancionesController {
  constructor(private readonly sancionesService: SancionesService) {}

  @Post()
  create(@Body() createSancioneDto: CreateSancioneDto) {
    return this.sancionesService.create(createSancioneDto);
  }

  @Get()
  findAll() {
    return this.sancionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sancionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSancioneDto: UpdateSancioneDto) {
    return this.sancionesService.update(+id, updateSancioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sancionesService.remove(+id);
  }
}
