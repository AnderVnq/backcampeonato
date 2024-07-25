import { IsNotEmpty, IsString } from "class-validator";

export class CrearBaseDto{


    @IsString({message:"el nombre debe ser una cadena de texto"})
    @IsNotEmpty({message:"el nombre no puede estar vacio"})
    nombre:string

    // @IsString({ message: 'El filepath debe ser una cadena de texto.' })
    // @IsNotEmpty({ message: 'El filepath no puede estar vacío.' })
    // //@IsUrl({}, { message: 'El filepath debe ser una URL válida.' })
    // filePath: string;


}