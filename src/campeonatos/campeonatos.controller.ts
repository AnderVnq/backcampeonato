import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe, Query, HttpStatus } from '@nestjs/common';
import { CampeonatosService } from './campeonatos.service';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';

@Controller('campeonatos')
export class CampeonatosController {
  constructor(private readonly campeonatosService: CampeonatosService) {}


  @UsePipes( new ValidationPipe({whitelist:true}))
  @Post()
  create(@Body() createCampeonatoDto: CreateCampeonatoDto) {
    return this.campeonatosService.create(createCampeonatoDto);
  }

  @Get()
  get_All() {
    return this.campeonatosService.get_all();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.campeonatosService.findOne(id);
  }



  @Get('findName')
  findByName(@Query('nombre') nombre:string){

    if(!nombre){
      return { message: 'El parámetro "nombre" es requerido.',status:HttpStatus.BAD_REQUEST};
    }

    return this.campeonatosService.findByName(nombre)
  }



  @UsePipes(new ValidationPipe({whitelist:true}))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCampeonatoDto: UpdateCampeonatoDto) {
    const number_id= parseInt(id)
    return this.campeonatosService.update(number_id,updateCampeonatoDto)
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.campeonatosService.remove(id);
  }
}
