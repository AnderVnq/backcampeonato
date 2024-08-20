import { IsNotEmpty, IsNumber, IsOptional } from "class-validator"

export class CreatePuntajeDto {

    @IsNotEmpty()
    @IsNumber()
    equipo:number
    @IsOptional()
    @IsNumber()
    pj:number
    @IsOptional()
    @IsNumber()
    pg:number
    @IsOptional()
    @IsNumber()
    pp:number
    @IsOptional()
    @IsNumber()
    pe:number
    @IsOptional()
    @IsNumber()
    gf:number
    @IsOptional()
    @IsNumber()
    gc:number
    @IsOptional()
    @IsNumber()
    dg:number
    @IsOptional()
    @IsNumber()
    puntos:number




}
