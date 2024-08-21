import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
//import { EstadoSancion } from "../enums/estado-sancion.enum";

export class CreateSancioneDto {

    @IsNotEmpty()
    @IsString()
    tipo:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(3)
    @MinLength(1)
    minuto:string

    
    @IsNotEmpty()
    @IsString()
    motivo:string

    @IsNotEmpty()
    @IsNumber()
    partido_id:number

    @IsNotEmpty()
    @IsNumber()
    jugador_id:number


    // @IsNotEmpty()
    // @IsEnum(EstadoSancion)
    // estado:EstadoSancion
}
