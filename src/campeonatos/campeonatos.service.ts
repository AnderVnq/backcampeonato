import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
//import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';
import { Repository } from 'typeorm';
import { Campeonatos } from './entities/campeonato.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from 'src/categorias/categorias.entity';


@Injectable()
export class CampeonatosService {

  constructor(

    @InjectRepository(Campeonatos)
    private readonly campeonatoRepository:Repository<Campeonatos>,

    @InjectRepository(Categorias)
    private readonly categoriaRepository:Repository<Categorias>

  ){}



  async get_all():Promise<Campeonatos[]> {
    const campeonatos = await this.campeonatoRepository.find()
    if(!campeonatos.length){
      throw new NotFoundException('No hay campeonatos registrados')
    }

    return campeonatos
  }


  async create(dto: CreateCampeonatoDto):Promise<any>{

      
    const {nombre,fecha_inicio}= dto
    const exists= await this.campeonatoRepository.findOne({where:[ {nombre:nombre}]})
    if(exists){
      throw new BadRequestException('El campeonato ya existe')
    }

    //console.log(fecha_inicio)
    ///console.log(new Date())
    //const fecha = formatDateToString(dto.fecha_inicio)
    const formattedDate = getDateOnly(fecha_inicio);

    // Buscar en la base de datos usando la fecha formateada
    // const validateFecha = await this.campeonatoRepository.findOne({
    //     where: {
    //         fecha_inicio: formattedDate
    //     }
    // });

    // if (validateFecha) {
    //   throw new BadRequestException('Los campeonatos no deben coincidir en la misma fecha de inicio');
    // }

    const categorias = await this.categoriaRepository.find({where:dto.categorias.map(cat=>(
      {nombre:cat}
    ))})

    if(!categorias.length){
      throw new NotFoundException('No existen esas categorias')
    }

    const campeonato= this.campeonatoRepository.create({
      ...dto,
      categorias
    })



    return {message:"creado",campeonato}
    //await this.campeonatoRepository.save(campeonato)
  }


  findOne(id: number) {
    return `This action returns a #${id} campeonato`;
  }

  // update(id: number, updateCampeonatoDto: UpdateCampeonatoDto) {
  //   return `This action updates a #${id} campeonato`;
  // }

  remove(id: number) {
    return `This action removes a #${id} campeonato`;
  }
}
