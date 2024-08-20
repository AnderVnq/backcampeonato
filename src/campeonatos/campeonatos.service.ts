import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCampeonatoDto } from './dto/create-campeonato.dto';
import { In, Repository } from 'typeorm';
import { Campeonatos } from './entities/campeonato.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from 'src/categorias/categorias.entity';
import { UpdateCampeonatoDto } from './dto/update-campeonato.dto';


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

      
    const {nombre}= dto
    const exists= await this.campeonatoRepository.findOne({where:[ {nombre:nombre}]})
    if(exists){
      throw new BadRequestException('El campeonato ya existe')
    }

    //console.log(fecha_inicio)
    ///console.log(new Date())
    //const fecha = formatDateToString(dto.fecha_inicio)
    //const formattedDate = getDateOnly(fecha_inicio);

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



    //return {message:"creado",campeonato}
    return await this.campeonatoRepository.save(campeonato)
  }


  async findOne(id: number):Promise<Campeonatos>{

    const campeonato= await this.campeonatoRepository.findOne({where:[{id:id}]})
    if(!campeonato){
      throw new NotFoundException("El campeonato no existe")
    }
    return campeonato
  }

  async remove(id: number){

    const campeonato = await this.campeonatoRepository.findOne({where:[{id:id}]})
    if(!campeonato){
      throw new NotFoundException("El campeonato no existe")
    }
    //return await this.campeonatoRepository.delete(id)
    return {message:"Campeonato eliminado correctamente",status:HttpStatus.NO_CONTENT}
  }


  async update(id: number, dto: UpdateCampeonatoDto) {
    const campeonato = await this.campeonatoRepository.findOne({ where: { id }, relations: ['categorias'] });
    if (!campeonato) {
      throw new BadRequestException('No existe ese campeonato');
    }
  
    if (!dto) {
      throw new BadRequestException('Datos de actualización no proporcionados');
    }
  
    // Validar y procesar categorías solo si están presentes en el DTO
    if (dto.categorias && dto.categorias.length > 0) {
      const exists = campeonato.categorias.map(c => c.nombre);
      const duplicate_cat = dto.categorias.filter(cat => exists.includes(cat));
  
      if (duplicate_cat.length) {
        throw new BadRequestException('El campeonato ya tiene esas categorías: ' + duplicate_cat.join(', '));
      }
  
      const existingCategories = await this.categoriaRepository.find({
        where: { nombre: In(dto.categorias) }
      });
      if (!existingCategories.length) {
        throw new BadRequestException("Las categorías no existen");
      }
  
      // Combinar categorías existentes con las nuevas
      const combinedCategories = [
        ...campeonato.categorias,
        ...existingCategories.filter(cat => !campeonato.categorias.some(existingCat => existingCat.id === cat.id))
      ];
  
      campeonato.categorias = combinedCategories;
    }
    
    campeonato.nombre = dto.nombre? dto.nombre : campeonato.nombre
    campeonato.fecha_inicio = dto.fecha_inicio ? dto.fecha_inicio : campeonato.fecha_inicio
    campeonato.fecha_fin = dto.fecha_fin ?dto.fecha_fin:campeonato.fecha_fin
    campeonato.lugar = dto.lugar?dto.lugar:campeonato.lugar
    
    return {message:"go",campeonato}
    
  }
  


  async findByName(name:string){

    const campeonato= await this.campeonatoRepository.findOne({where:[{nombre:name}]})

    if(campeonato){
      throw new NotFoundException(`El campeonato con el nombre ${name}`)
    }

    return campeonato

  }



  
}
