import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Categorias } from './categorias.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { CategoriaEnum } from './categorias.enum';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { BasesService } from 'src/bases/bases.service';

@Injectable()
export class CategoriasService {

    constructor(
        @InjectRepository(Categorias)
        private readonly categoriaRepository:Repository<Categorias>,

        private readonly basesService:BasesService
    ){}




    async get_all():Promise<any>{
        const categorias = await this.categoriaRepository.find()
        if(!categorias.length){return new NotFoundException('No existen categorias')}
        return categorias
    }


    async create_categorias(dto:CrearCategoriaDto):Promise<any>{
        
        const nombre=dto.nombre as CategoriaEnum
        const exists = await this.categoriaRepository.findOne({
            where:[{nombre:nombre}]
        })

        if(exists){throw new BadRequestException('Esa categoria ya existe')}
        
        const base = await this.basesService.getById(dto.bases)
        if(!base){
            throw new NotFoundException('la base declarada no existe')
        }

        const categoria = this.categoriaRepository.create({
            nombre:dto.nombre as CategoriaEnum,
            bases:base
        })

        return await this.categoriaRepository.save(categoria)
    }


    async get_ById(id:number):Promise<any>{
        const categoria = await this.categoriaRepository.findOne({where:[{id:id}]})
        if(!categoria){
            throw new NotFoundException('Categoria no existente')
        }

        return categoria
    }

    
    async update_categoria(id:number,dto:UpdateCategoriaDto):Promise<any>{
        const categoria = await this.categoriaRepository.findOne({ where: [{ id: id }] });
        if (!categoria) {
            throw new BadRequestException('No existe esa categoría');
        }
    
        // Verificar si ya existe una categoría con el mismo nombre y base
        const nombre = dto.nombre as CategoriaEnum;
        const exists = await this.categoriaRepository.findOne({ where: [{ nombre: nombre }] });
        
        if (exists && exists.bases && exists.bases.id === dto.base) {
            throw new BadRequestException('Esa categoría ya existe');
        }
    
        // Verificar si la base existe
        const base = await this.basesService.getById(dto.base);
        if (!base) {
            throw new NotFoundException(`La base con el id ${dto.base} no existe`);
        }
    
        // Actualizar la categoría con los nuevos valores
        categoria.nombre = dto.nombre ? nombre : categoria.nombre;
        categoria.bases = dto.base ? base : categoria.bases;
        
        await this.categoriaRepository.save(categoria);
    
        return { message: 'Categoría actualizada exitosamente', categoria };
    }
}
