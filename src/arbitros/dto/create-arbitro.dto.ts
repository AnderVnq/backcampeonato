import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateArbitroDto {


    @IsNotEmpty()
    @IsString()
    nombre:string

    @IsNotEmpty()
    @IsString()
    primer_apellido:string

    @IsNotEmpty()
    @IsString()
    segundo_apellido:string

    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    telefono:string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    dni:string



}
