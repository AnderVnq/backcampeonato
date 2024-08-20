import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePartidoDto } from './dto/create-partido.dto';
import { UpdatePartidoDto } from './dto/update-partido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Partido } from './entities/partido.entity';
import { In, Repository } from 'typeorm';
import { CampeonatosService } from 'src/campeonatos/campeonatos.service';
import { EquiposService } from 'src/equipos/equipos.service';
import { ArbitrosService } from 'src/arbitros/arbitros.service';
import { Puntaje } from 'src/puntajes/entities/puntaje.entity';
import { InscripcionesService } from 'src/inscripciones/inscripciones.service';


@Injectable()
export class PartidosService {

  constructor(

    @InjectRepository(Partido)
    private readonly partidoRepository:Repository<Partido>,
    private readonly campeonatoService:CampeonatosService,
    private readonly equipoService:EquiposService,
    private readonly arbitroService:ArbitrosService,
    @InjectRepository(Puntaje)
    private readonly puntajeRepository:Repository<Puntaje>,

    private readonly inscripcionService:InscripcionesService

  ){}

  async create(dto: CreatePartidoDto) {

    const {campeonato_id,local_id,visitante_id}= dto


    if(local_id ===visitante_id){
      throw new BadRequestException('el mismo equipo no puede ser local y visitante')
    }


    const campeonato = await this.campeonatoService.findOne(campeonato_id)
    const local = await this.equipoService.findOne(local_id)
    const visitante = await this.equipoService.findOne(visitante_id)
    const inscripciones = await this.inscripcionService.inscripcionsByCampeonato(campeonato.id)

    console.log(inscripciones)

    const exists_inscripcion_local = inscripciones.find(x => x.equipo.id==local.id)
    const exists_inscripcion_visitante = inscripciones.find(x=>x.equipo.id === visitante.id)


    if(!exists_inscripcion_local){
      throw new BadRequestException(`El equipo ${local.id}  no está inscrito en el campeonato`)
    }

    if(!exists_inscripcion_visitante){
      throw new BadRequestException(`El equipo ${visitante.id} no esta inscrito en el campeonato`)
    }

    console.log(campeonato.inscripciones)
    //validar que no sean el mismo equipo para local y visitante
    if(!campeonato){
      throw new NotFoundException('El campeonato no existe')
    }

    if(!local){
      throw new NotFoundException('El equipo local no existe')
    }

    if(!visitante){
      throw new NotFoundException('El equipo visitante no existe')
    }

    const exists = await this.partidoRepository.findOne({
      where:[{equipo_local:local},{equipo_visitante:visitante},{fase:dto.fase}]
    })

    //console.log(exists)

    if(exists){
      throw new BadRequestException('El encuentro ya fue registrado')
    }

    const arbitros = await Promise.all(
      dto.arbitros.map(arbitroId => this.arbitroService.findOne(arbitroId))
    );

    const partido = this.partidoRepository.create({
      ...dto,
      arbitros:arbitros,
      equipo_local:local,
      equipo_visitante:visitante
    })



    const exist_puntajes = await this.puntajeRepository.find({
      where:{
        equipo:In([local.id,visitante.id]) 
      }
    })

    if(exist_puntajes.length){
      const exists_local= exist_puntajes.find(x => x.equipo.id === local.id)
      const exist_visitante = exist_puntajes.find(x=>x.equipo.id=== visitante.id)
  
      if(!exists_local){
        const puntaje_equipo_local= this.puntajeRepository.create(
          {
            equipo:local
          }
        )
        //await this.puntajeRepository.save(puntaje_equipo_local)
      }
  
      if(exist_visitante){
        const puntaje_equipo_visitante= this.puntajeRepository.create(
          {
            equipo:visitante
          }
        )
  
        //await this.puntajeRepository.save(puntaje_equipo_visitante)
      }
    }


    //console.log(exist_puntajes)

    return {}//await this.partidoRepository.save(partido);
  }

  async findAll() {


    const partidos = await this.partidoRepository.find()

    if(!partidos.length){
      throw new NotFoundException('No hay partidos registrados')
    }

    return partidos;
  }

  async findOne(id: number) {

    const partido = await this.partidoRepository.findOne({where:{id:id}})
    if(!partido){
      throw new NotFoundException('El encuentro no existe')
    }
    return partido
  }

  async update(id: number, dto: UpdatePartidoDto) {


    const partido = await this.partidoRepository.findOne({where:{id:id}})

    if(!partido){
      throw new NotFoundException('Partido no encontrado')
    }

    if(dto.arbitros.length){

      const arbitros = await Promise.all(
        dto.arbitros.map(arbitroId => this.arbitroService.findOne(arbitroId))
      );

      partido.arbitros =arbitros
    }

    partido.goles_local = dto.goles_local?? partido.goles_local
    partido.goles_visitante= dto.goles_visitante?? partido.goles_visitante





    await this.partidoRepository.save(partido)

    return {
      message:"Partido actualizado correctamente",
      status:HttpStatus.OK
    };
  }

  remove(id: number) {
    return `This action removes a #${id} partido`;
  }
}
