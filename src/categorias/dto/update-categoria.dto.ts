import { IsEnum, IsNotEmpty, IsNumber } from "class-validator"
import { CategoriaEnum } from "../categorias.enum"

export class UpdateCategoriaDto{

    @IsEnum(CategoriaEnum,{message:'Las categorias deben ser [master,libre,juvenil,femenino]'})
    nombre:string

    @IsNumber()
    @IsNotEmpty() 
    base:number
    /*
    
        agregar update pero solo de la base 
    */

}


