import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bases } from './bases.entity';
import { Repository } from 'typeorm';
import { CrearBaseDto } from './dto/crear-base.dto';
import { UpdateBaseNombre } from './dto/update.nombre.dto';

@Injectable()
export class BasesService {


    constructor(
        @InjectRepository(Bases)
        private readonly baseRepository:Repository<Bases>
    ){}



    async get_all():Promise<Bases[]>{
        const bases = await this.baseRepository.find()
        if(!bases.length){
            throw new NotFoundException('No hay bases existentes')
        }

        return bases
    }


    async create_base(dto:CrearBaseDto & { filePath: string }):Promise<any>{
        const exists= await this.baseRepository.findOne({where:[{filePath:dto.filePath}]})
        if(exists){
            throw new BadRequestException('la url/file ya fue registrada')
        }

        const base= this.baseRepository.create(dto) 

        return await this.baseRepository.save(base)
    }


    async getById(id:number):Promise<any>{
        const base = await this.baseRepository.findOne({where:[{id:id}]})

        if(!base){
            throw new NotFoundException('Base no existente')
        }

        return base
    }


    async update_nombre_base(id:number , dto:UpdateBaseNombre):Promise<any>{
        const base= await this.baseRepository.findOne({where:[{id:id}]})

        if(!base){
            throw new NotFoundException(`la base con el id ${id} no existe`)
        }

        const exists = await this.baseRepository.findOne({where:[{nombre:dto.nombre}]})
        if(exists){
            throw new BadRequestException('La base con ese nombre ya existe')
        }

        base.nombre = dto.nombre ? dto.nombre : base.nombre
        
        await this.baseRepository.save(base)

        return {
            message:'Nombre de la base actualizada correctamente',base
        }
    }


    

}
