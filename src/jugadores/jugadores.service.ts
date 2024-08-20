import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateJugadoreDto } from './dto/create-jugadore.dto';
import { UpdateJugadoreDto } from './dto/update-jugadore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Jugadores } from './entities/jugadore.entity';
import { Repository } from 'typeorm';
import { EquiposService } from 'src/equipos/equipos.service';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CategoriaEnum } from 'src/categorias/categorias.enum';
import { GeneroJugador } from './enums/genero-jugador.enum';
import { EstadoJugador } from './enums/estado-jugador.enum';



@Injectable()
export class JugadoresService {



  constructor(

    @InjectRepository(Jugadores)
    private readonly jugadoresRepository:Repository<Jugadores>,
    private readonly equipoService:EquiposService,
    private readonly categoriaService:CategoriasService

  ){}



  async create(dto: CreateJugadoreDto) {

    const{dni,categoria_id,equipo_id,fechaNacimiento,genero}= dto 
    const jugador = await this.jugadoresRepository.findOne({where:{dni:dni}})

    if(jugador){
      throw new BadRequestException('El jugador ya existe')
    }

    const equipo= await this.equipoService.findOne(equipo_id)

    if(!equipo){
      throw new NotFoundException('El equipo No existe')
    }

    const categoria= await this.categoriaService.get_ById(categoria_id)
    if(!categoria){
      throw new NotFoundException('La categoria no existe')
    }
    if(!dto.estado_jugador){
      dto.estado_jugador=EstadoJugador.ACTIVO
    }
    if (fechaNacimiento) {
      const now = new Date();
      if (fechaNacimiento > now) {
        throw new BadRequestException('La fecha de nacimiento no puede ser una fecha futura.');
      }

      // Validar edad mínima (por ejemplo, 18 años)
      let edad = now.getFullYear() - fechaNacimiento.getFullYear();
      const mes = now.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && now.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }

      if (edad < 40 && categoria.nombre === CategoriaEnum.MASTER) {
        throw new BadRequestException('La persona debe tener al menos 40 años.');
      }

      if(edad >18 && categoria.nombre === CategoriaEnum.JUVENIL){
        throw new BadRequestException('La persona debe tener al menos 18 años')
      }
      if(genero===GeneroJugador.FEMENINO && categoria.nombre!==CategoriaEnum.FEMENINO){
        throw new BadRequestException('error en el genero')
      }
    }
    //dto.estado_jugador as EstadoJugador
    //dto.posicion_jugador as PosicionJugador
    

    const new_jugador = this.jugadoresRepository.create(dto)

    
    return new_jugador;
  }

  async findAll():Promise<Jugadores[]> {

    const jugadores = await this.jugadoresRepository.find()
    if(!jugadores.length){
      throw new NotFoundException('No se registraron jugadores')
    }
    return jugadores;
  }

  async findOne(id: number):Promise<Jugadores>{

    const jugador = await this.jugadoresRepository.findOne({where:{id}})

    if(!jugador){
      throw new NotFoundException('Jugador no encontrado')
    }

    return jugador;

  }

  async update(id: number, dto: UpdateJugadoreDto){


    const jugador = await this.jugadoresRepository.findOne({where:{id:id}}) 
    if(!jugador){
      throw new NotFoundException('El jugador no existe')
    }

    if(dto.categoria_id){
      const categoria = await this.categoriaService.get_ById(dto.categoria_id)
      if(!categoria){
        throw new BadRequestException('la categoria no existe')
      }
      jugador.categoria = categoria
    }
    if(dto.equipo_id){
      const equipo= await this.equipoService.findOne(dto.equipo_id)
      if(!equipo){
        throw new BadRequestException('El equipo no existe')
      }
      const limite_jugadores= equipo.jugadores.length
      if(limite_jugadores>=12){
        throw new BadRequestException('El equipo llego a su limite de jugadores')
      }
      jugador.equipo = equipo
    }

    jugador.nombres = dto.nombres ?? jugador.nombres;
    jugador.primer_apellido = dto.primer_apellido ?? jugador.primer_apellido;
    jugador.segundo_apellido =  dto.segundo_apellido ?? jugador.segundo_apellido;
    jugador.dni = dto.dni ?? jugador.dni;
    jugador.foto =  dto.foto ?? jugador.foto;
    jugador.imagen_dni =  dto.imagen_dni ?? jugador.imagen_dni;
    jugador.estado =  dto.estado_jugador ?? jugador.estado;
    jugador.posicion_jugador =  dto.posicion_jugador ?? jugador.posicion_jugador;
    jugador.direccion =  dto.direccion ?? jugador.direccion;

    try {
      return await this.jugadoresRepository.save(jugador);
    } catch (error) {
      throw new BadRequestException('Error al actualizar el jugador');
    }
  }

  async remove(id: number) {

    const jugador= await this.jugadoresRepository.findOne({where:{id:id}})
    if(!jugador){
      throw new NotFoundException('El jugador no existe')
    }

    await this.jugadoresRepository.delete(id)
    

    return {message:"Jugador Eliminado Correctamente",status:HttpStatus.OK}
  }
}
