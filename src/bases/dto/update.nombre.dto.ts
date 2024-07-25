import { IsNotEmpty, IsString } from "class-validator";

export class UpdateBaseNombre{

    @IsString({message:"el nombre debe ser una cadena de texto"})
    @IsNotEmpty({message:"el nombre no puede estar vacio"})
    nombre:string

}