import { Transform } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdatePartidoDto{

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => {
        const date = new Date(value);
        return date;
    }, { toClassOnly: true })
    fecha?: Date;

    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    arbitros?: number[];

    
    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    goles_local:number

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    goles_visitante:number

}
