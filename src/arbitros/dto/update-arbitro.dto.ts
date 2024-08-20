import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator"

export class UpdateArbitroDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    nombre:string
    
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    primer_apellido:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    segundo_apellido:string


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(9)
    @MaxLength(9)
    telefono:string

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    dni:string


}
