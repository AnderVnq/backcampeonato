import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { Repository } from 'typeorm';
import { Grupos } from './entities/grupo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GruposService {

  constructor(
    @InjectRepository(Grupos)
    private readonly grupoRepository:Repository<Grupos>
  ){}



  async create(dto: CreateGrupoDto) {

    
    const exists = await this.grupoRepository.findOne({where:{nombre:dto.nombre}})

    if(exists){
      throw new BadRequestException('El grupo con ese nombre ya existe')
    }

    const new_grupo= this.grupoRepository.create()

    return new_grupo; // await this.grupoRepository.save(new_grupo)
  }

  async findAll() {
    const grupos = await this.grupoRepository.find()
    
    if(!grupos.length){
      throw new NotFoundException('No hay grupos existentes')
    }
    return grupos
  }

  async findOne(id: number):Promise<Grupos> {
  
    const grupo = await this.grupoRepository.findOne({where:{id:id}})
    if(!grupo){
      throw new NotFoundException('Grupo no existente')
    }

    return grupo
  }

  async update(id: number, dto: UpdateGrupoDto):Promise<Grupos> {

    const grupo= await this.grupoRepository.findOne({where:{id:id}})
    if(!grupo){
      throw new NotFoundException('El grupo no existe')
    }
    
    grupo.nombre = dto.nombre?? grupo.nombre



    return await this.grupoRepository.save(grupo)
  }

  async remove(id: number) {

    const grupo = await this.grupoRepository.findOne({where:{id:id}})

    if(!grupo){
      throw new NotFoundException('El grupo no existe')
    }
    await this.grupoRepository.delete(id)

    return {message:'Grupo Eliminado Correctamente',status:HttpStatus.OK};
  }
}
