import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"

export class CreateEquipoDto {

    @IsString({message:'El nombre debe ser un string'})
    @IsNotEmpty({message:"El nombre no debe esatar vacio"})
    nombre:string

    @IsUrl()
    @IsOptional()
    logo_equipo?:string 
    
    @IsString({message:"El delegado debe ser una cadena de texto"})
    @IsNotEmpty({message:"El campo de delegado no debe estar vacio"})
    delegado:string

    @IsString({message:"El lugar debe ser un string"})
    @IsOptional()
    lugar?:string
}
