import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateGrupoDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @MinLength(1)
    nombre:string

}
