import { IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
//import { Categorias } from "src/categorias/categorias.entity"
import { CategoriaEnum } from "src/categorias/categorias.enum"

export class UpdateCampeonatoDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty({message:"No debe estar vacio"})
    @MinLength(10,{message:"El nombre debe tener al menos 10 caracteres"})
    nombre?:string

    @IsOptional()
    @IsString()
    @IsNotEmpty({message:"No debe estar vacio"})
    @MinLength(10,{message:"El Lugar debe tener al menos 10 caracteres"})
    lugar?:string
    
    @IsDate()
    @IsOptional()
    fecha_fin?:Date

    @IsDate()
    @IsOptional()
    fecha_inicio?:Date

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    @IsEnum(CategoriaEnum,{each:true})
    categorias?:CategoriaEnum[]

}
