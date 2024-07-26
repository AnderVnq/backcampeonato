import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { CategoriaEnum } from "src/categorias/categorias.enum";


export class CreateCampeonatoDto {

    @IsString({message:"El nombre debe ser de tipo texto"})
    @IsNotEmpty({message:"El nombre no debe estar vacio"})
    nombre: string;
    
    @Type(() => Date) // Convierte la cadena a Date
    @IsDate()
    @IsNotEmpty({message:"La fecha inicio no debe estar vacia"})
    //@IsFutureDate({ message: 'La fecha de inicio debe ser una fecha futura' })
    fecha_inicio: Date;
  
    @Type(() => Date) // Convierte la cadena a Date
    @IsDate()
    @IsOptional()
    //@IsFutureDate({ message: 'La fecha de fin debe ser una fecha futura' })
    fecha_fin?: Date;
  
    @IsString()
    @IsNotEmpty({message:"El lugar no debe estar vacia"})
    lugar: string;
  
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(CategoriaEnum, { each: true })
    categorias: CategoriaEnum[];

}
