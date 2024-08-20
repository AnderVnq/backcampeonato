import { Transform } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsDate,  IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"

export class CreatePartidoDto {

    @IsNotEmpty()
    @IsNumber()
    campeonato_id:number

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    fase:string

    @IsNotEmpty()
    @IsNumber()
    local_id:number
    @IsNotEmpty()
    @IsNumber()
    visitante_id:number

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const date = new Date(value);
        return date;
    }, { toClassOnly: true })
    fecha?: Date;// La fecha se manejará como un objeto Date

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    arbitros: number[];



}
