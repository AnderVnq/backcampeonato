import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator"
import { PosicionJugador } from "../enums/posicion-jugador.enum"
import { EstadoJugador } from "../enums/estado-jugador.enum"
import { Type } from "class-transformer"
import { GeneroJugador } from "../enums/genero-jugador.enum"

export class CreateJugadoreDto {

    @IsNotEmpty()
    @IsString()
    nombres:string

    @IsNotEmpty()
    @IsString()
    primer_apellido:string

    @IsNotEmpty()
    @IsString()
    segundo_apellido:string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    dni:string

    @IsOptional()
    @IsDate()
    @Type(() => Date) // Asegura la conversión a Date
    fechaNacimiento?: Date;
    @IsNotEmpty()
    @IsEnum(GeneroJugador)
    genero:GeneroJugador
    @IsOptional()
    @IsUrl()
    foto?:string

    @IsOptional()
    @IsUrl()
    imagen_dni?:string
    @IsOptional()
    @IsNotEmpty()
    @IsEnum(EstadoJugador)
    estado_jugador?:EstadoJugador

    @IsNotEmpty()
    @IsEnum(PosicionJugador)
    posicion_jugador:PosicionJugador

    @IsNotEmpty()
    @IsString()
    direccion:string

    @IsNotEmpty()
    @IsNumber()
    categoria_id:number

    @IsNotEmpty()
    @IsNumber()
    equipo_id:number


}
