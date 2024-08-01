import { Injectable } from '@nestjs/common';
import { CreateJugadoreDto } from './dto/create-jugadore.dto';
import { UpdateJugadoreDto } from './dto/update-jugadore.dto';

@Injectable()
export class JugadoresService {
  create(createJugadoreDto: CreateJugadoreDto) {
    return 'This action adds a new jugadore';
  }

  findAll() {
    return `This action returns all jugadores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jugadore`;
  }

  update(id: number, updateJugadoreDto: UpdateJugadoreDto) {
    return `This action updates a #${id} jugadore`;
  }

  remove(id: number) {
    return `This action removes a #${id} jugadore`;
  }
}
