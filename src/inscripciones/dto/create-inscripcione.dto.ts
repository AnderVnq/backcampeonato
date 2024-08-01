import { EstadoInscripcion } from "../enums/estado.enum";
import { IsEnum, IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateInscripcioneDto {

    @IsNotEmpty({ message: 'El ID del campeonato no puede estar vacío' })
    @IsInt({ message: 'El ID del campeonato debe ser un número entero' })
    campeonato_id: number;
  
    @IsNotEmpty({ message: 'El ID del equipo no puede estar vacío' })
    @IsInt({ message: 'El ID del equipo debe ser un número entero' })
    equipo_id: number;
    
    @IsOptional()
    @IsNotEmpty({ message: 'El estado no puede estar vacío' })
    @IsEnum(EstadoInscripcion, { message: 'El estado debe ser uno de los valores permitidos(pendiente,finalizado)' })
    estado?: EstadoInscripcion;

}
