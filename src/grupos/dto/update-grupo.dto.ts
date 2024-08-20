import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateGrupoDto{
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(1)
    nombre:string
}   
