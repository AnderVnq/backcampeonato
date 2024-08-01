import { IsEnum, IsNotEmpty } from "class-validator";
import { EstadoInscripcion } from "../enums/estado.enum";

export class UpdateInscripcioneDto{


    @IsNotEmpty({ message: 'El estado no puede estar vacío' })
    @IsEnum(EstadoInscripcion, { message: 'El estado debe ser uno de los valores permitidos(pendiente,finalizado)' })
    estado?: EstadoInscripcion;

}
