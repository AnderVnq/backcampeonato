import {IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreateMailDto {


    @IsNotEmpty()
    @IsString()
    receptor:string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    motivo:string

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    campeonato_id:number

}
