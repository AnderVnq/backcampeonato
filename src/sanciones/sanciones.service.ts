import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSancioneDto } from './dto/create-sancione.dto';
import { UpdateSancioneDto } from './dto/update-sancione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sancion } from './entities/sancione.entity';
import { Repository } from 'typeorm';
import { JugadoresService } from 'src/jugadores/jugadores.service';
import { PartidosService } from 'src/partidos/partidos.service';
import { EstadoSancion } from './enums/estado-sancion.enum';

@Injectable()
export class SancionesService {


  constructor(

    @InjectRepository(Sancion)
    private readonly sancionRepository:Repository<Sancion>,
    private readonly jugadorService:JugadoresService,
    private readonly partidoService:PartidosService

  ){}


  async create(dto: CreateSancioneDto) {

    const partido = await this.partidoService.findOne(dto.partido_id)
    if(!partido){
      throw new BadRequestException('Error al encontrar el partido')
    }

    const jugador = await this.jugadorService.findOne(dto.jugador_id)

    if(!jugador){
      throw new BadRequestException('Error al encontrar el jugador')
    }

    const new_sancion = this.sancionRepository.create({

      tipo:dto.tipo,
      minuto:dto.minuto,
      motivo:dto.motivo,
      partido:partido,
      jugador:jugador,
      estado:EstadoSancion.SANCIONADO
    })
    
    return await this.sancionRepository.save(new_sancion)
  }

  async findAll():Promise<Sancion[]>{

    const sanciones = await this.sancionRepository.find()

    if(!sanciones.length){
      throw new NotFoundException('No se registraron sanciones')
    }

    return sanciones;
  }

  async findOne(id: number):Promise<Sancion>{

    const sancion = await this.sancionRepository.findOne({where:{id:id}})

    if(!sancion){
      throw new NotFoundException('No se encontro la sancion')
    }

    return sancion
  }

  update(id: number, dto: UpdateSancioneDto) {
    return `This action updates a #${id} ${dto} sancione`;
  }

  remove(id: number) {
    return `This action removes a #${id} sancione`;
  }
}
