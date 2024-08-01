import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { Repository } from 'typeorm';
import { Equipo } from './entities/equipo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EquiposService {

  constructor(

    @InjectRepository(Equipo)
    private readonly equipoRepository:Repository<Equipo>

  ){}


  async create(dto: CreateEquipoDto):Promise<any> {

    const {nombre,delegado}=dto

    const exists = await this.equipoRepository.findOne({where:[{nombre:nombre}]})
    if(exists){
      throw new BadRequestException('El equipo ya existe')
    }
    const delegado_exists= await this.equipoRepository.findOne({where:[{delegado:delegado}]})
    if(delegado_exists){
      throw new BadRequestException('El delegado ya esta asignado a un equipo')
    }

    const new_equipo= this.equipoRepository.create(dto)
    return await this.equipoRepository.save(new_equipo)


  }

  async findAll():Promise<Equipo[]>{

    const equipos = await this.equipoRepository.find()
    if(!equipos.length){
      throw new NotFoundException('No hay equipos registrados')
    }
    return equipos
  }

  async findByName(nombre:string){
    const equipo = await this.equipoRepository.findOne({where:[{nombre:nombre}]})

    if(!equipo){
      throw new NotFoundException(`El equipo no existe`)
    }

    return equipo
  }
  
  async findOne(id: number) {

    const equipo = await this.equipoRepository.findOne({where:[{id:id}]})

    if(!equipo){
      throw new NotFoundException(`El equipo no existe`)
    }

    return equipo
  }

  //realizar cuando tengas definido la relacion con delegado
  async update(id: number, dto: UpdateEquipoDto) {

    return `This action updates a #${id} equipo ${dto}`;
  }



  async remove(id: number) {

    const equipo = await this.equipoRepository.findOne({where:[{id:id}]})

    if(!equipo){
      throw new NotFoundException(`El equipo no existe`)
    }

    return {
      message:"Equipo Eliminado Correctamente",
      status:HttpStatus.OK
    };
  }
}
