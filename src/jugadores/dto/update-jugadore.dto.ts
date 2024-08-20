import { IsEnum, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator"
import { EstadoJugador } from "../enums/estado-jugador.enum"
import { PosicionJugador } from "../enums/posicion-jugador.enum"

export class UpdateJugadoreDto{

    @IsOptional()
    @IsString()
    nombres?:string
    @IsOptional()
    @IsString()
    primer_apellido?:string
    @IsOptional()
    @IsString()
    segundo_apellido?:string
    @IsOptional()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    dni?:string
    @IsOptional()
    @IsUrl()
    foto?:string
    @IsOptional()
    @IsUrl()
    imagen_dni:string
    @IsOptional()
    @IsEnum(EstadoJugador)
    estado_jugador?:EstadoJugador
    @IsOptional()
    @IsEnum(PosicionJugador)
    posicion_jugador?:PosicionJugador
    @IsOptional()
    @IsString()
    direccion?:string
    @IsOptional()
    @IsNumber()
    categoria_id?:number
    @IsOptional()
    @IsNumber()
    equipo_id?:number
}
