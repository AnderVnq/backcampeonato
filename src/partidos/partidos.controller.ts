import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { PartidosService } from './partidos.service';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';

@Controller('partidos')
export class PartidosController {
  constructor(private readonly partidosService: PartidosService) {}


  @UsePipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted: false}))
  @Post()
  create(@Body() createPartidoDto: CreatePartidoDto) {
    return this.partidosService.create(createPartidoDto);
  }

  @Get()
  findAll() {
    return this.partidosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partidosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartidoDto: UpdatePartidoDto) {
    return this.partidosService.update(+id, updatePartidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partidosService.remove(+id);
  }
}
