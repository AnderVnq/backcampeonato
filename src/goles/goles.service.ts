import { Injectable } from '@nestjs/common';
import { CreateGoleDto } from './dto/create-gole.dto';
import { UpdateGoleDto } from './dto/update-gole.dto';

@Injectable()
export class GolesService {
  create(createGoleDto: CreateGoleDto) {
    return 'This action adds a new gole';
  }

  findAll() {
    return `This action returns all goles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gole`;
  }

  update(id: number, updateGoleDto: UpdateGoleDto) {
    return `This action updates a #${id} gole`;
  }

  remove(id: number) {
    return `This action removes a #${id} gole`;
  }
}
