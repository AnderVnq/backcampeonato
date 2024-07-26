import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { CategoriaEnum } from "../categorias.enum";



export class CrearCategoriaDto{

    @IsEnum(CategoriaEnum,{message:'Las categorias deben ser [master,libre,juvenil,femenino]'})
    nombre:string

    @IsNotEmpty()
    @IsNumber()
    bases:number

}