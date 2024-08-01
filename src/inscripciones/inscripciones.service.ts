import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInscripcioneDto } from './dto/create-inscripcione.dto';
import { UpdateInscripcioneDto } from './dto/update-inscripcione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscripciones } from './entities/inscripcione.entity';
import { Repository } from 'typeorm';
import { EquiposService } from 'src/equipos/equipos.service';
import { CampeonatosService } from 'src/campeonatos/campeonatos.service';
import { EstadoInscripcion } from './enums/estado.enum';

@Injectable()
export class InscripcionesService {

  constructor(

    @InjectRepository(Inscripciones)
    private readonly inscripcionRepository:Repository<Inscripciones>,

    private readonly equiposService:EquiposService,

    private readonly campeonatoService:CampeonatosService


  ){}
  
  
  
  async create(dto: CreateInscripcioneDto) {

    const {campeonato_id,equipo_id,estado}=dto
    const campeonato = await this.campeonatoService.findOne(campeonato_id)
    const equipo= await this.equiposService.findOne(equipo_id)

    if(!campeonato){
      throw new BadRequestException('El campeonato no existe')
    }

    if(!equipo){
      throw new BadRequestException('El equipo no existe')
    }


    const exists = await this.inscripcionRepository.count({where:
      {
        campeonato:{id:campeonato_id},
        equipo:{id:equipo_id}
      }
    })

    if(exists >=1){
      throw new BadRequestException('El equipo ya esta registrado en el campeonato')
    }

    console.log(exists)

    const inscripcion = this.inscripcionRepository.create(
      {
        campeonato:campeonato,
        equipo:equipo,
      }
    )

    inscripcion.estado = estado ?? EstadoInscripcion.PENDIENTE;

    return await this.inscripcionRepository.save(inscripcion)
  }

  async findAll() {

    const inscripciones = await this.inscripcionRepository.find()
    if(!inscripciones.length){
      throw new NotFoundException('No existen inscripciones')
    }

    return inscripciones;
  }

  async findOne(id: number) {

    const inscripcion = await this.inscripcionRepository.findOne({where:[{id:id}]})

    if(!inscripcion){
      throw new NotFoundException('No hay registros para esa inscripcion')
    }
    return inscripcion
  }



  async inscripcionsByCampeonato(campeonato_id:number){

    const camp = await this.campeonatoService.findOne(campeonato_id)

    const inscripciones = await this.inscripcionRepository.find({where:
      {campeonato:camp.id},
      relations:['equipo']
    }
    )

    console.log(inscripciones)
  }








  update(id: number, dto: UpdateInscripcioneDto) {
    return `This action updates a #${id} ${dto}inscripcione`;
  }

  async remove(id: number) {

    const inscripcion = await this.inscripcionRepository.findOne({where:{id}})

    console.log(inscripcion)
    if(!inscripcion){
      throw new NotFoundException('la inscripcion no existe')
    }

    this.inscripcionRepository.delete(id)

    return {
      message:"Inscripcion Eliminada Correctamente",
      status:HttpStatus.NO_CONTENT
    }
  }
}
