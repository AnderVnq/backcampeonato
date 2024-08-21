import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"
import { EstadoSancion } from "../enums/estado-sancion.enum"

export class UpdateSancioneDto {

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    tipo:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    minuto:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    motivo:string

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    jugador_id:number

    @IsOptional()
    @IsNotEmpty()
    @IsEnum(EstadoSancion)
    estado:EstadoSancion
}
