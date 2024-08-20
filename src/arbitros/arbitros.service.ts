import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArbitroDto } from './dto/create-arbitro.dto';
import { UpdateArbitroDto } from './dto/update-arbitro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Arbitro } from './entities/arbitro.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArbitrosService {
  

  constructor(

    @InjectRepository(Arbitro)
    private readonly arbitroRepository:Repository<Arbitro>

  ){}
  
  
  async create(dto: CreateArbitroDto) {


    const arbitro = await this.arbitroRepository.findOne({where:{dni:dto.dni}})

    if(arbitro){
      return new BadRequestException('El arbitro ya existe')
    }

    const new_arbitro= this.arbitroRepository.create(dto)


    return await this.arbitroRepository.save(new_arbitro)
  }

  async findAll():Promise<Arbitro[]> {

    const arbitros= await this.arbitroRepository.find()

    if(arbitros.length){
      throw new NotFoundException('No hay arbitros existentes')
    }


    return arbitros
  }

  async findOne(id: number):Promise<Arbitro>{

    const arbitro = await this.arbitroRepository.findOne({where:{id:id}})

    if(!arbitro){
      throw new NotFoundException('El arbitro no existe')
    }
    return arbitro;
  }

  async update(id: number, dto: UpdateArbitroDto) {

    const arbitro = await this.arbitroRepository.findOne({where:{id:id}})
    if(!arbitro){
      throw new NotFoundException('EL abritro no existe')
    }

    arbitro.primer_apellido=dto.primer_apellido??arbitro.primer_apellido
    arbitro.segundo_apellido=dto.segundo_apellido??arbitro.segundo_apellido
    arbitro.telefono=dto.telefono??arbitro.telefono
    arbitro.nombre=dto.nombre??arbitro.nombre
    arbitro.dni=dto.dni??arbitro.dni


    return await this.arbitroRepository.save(arbitro)
  }

  async remove(id: number) {

    const arbitro = await this.arbitroRepository.findOne({where:{id:id}})
    if(!arbitro){
      throw new NotFoundException('El arbitro no existe')
    }

    await this.arbitroRepository.delete(id)
    return {message:'Arbitro eliminado correctamente',status:HttpStatus.OK}
  }
}
