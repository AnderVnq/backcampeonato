import { Injectable } from '@nestjs/common';
import { CreatePuntajeDto } from './dto/create-puntaje.dto';
import { UpdatePuntajeDto } from './dto/update-puntaje.dto';

@Injectable()
export class PuntajesService {
  create(createPuntajeDto: CreatePuntajeDto) {
    return 'This action adds a new puntaje';
  }

  findAll() {
    return `This action returns all puntajes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puntaje`;
  }

  update(id: number, updatePuntajeDto: UpdatePuntajeDto) {
    return `This action updates a #${id} puntaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} puntaje`;
  }
}
