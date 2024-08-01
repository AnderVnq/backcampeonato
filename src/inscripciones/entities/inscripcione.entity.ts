import { Campeonatos } from "src/campeonatos/entities/campeonato.entity";
import { Equipo } from "src/equipos/entities/equipo.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstadoInscripcion } from "../enums/estado.enum";


@Entity()
export class Inscripciones {

    @PrimaryGeneratedColumn('increment')
    id:number

    @ManyToOne(() => Campeonatos, campeonatos => campeonatos.inscripciones)
    campeonato: Campeonatos;

    @ManyToOne(() => Equipo, equipo => equipo.inscripciones)
    equipo: Equipo;
  
    @CreateDateColumn({type:'timestamp'})
    fecha_inscripcion: Date;

    @Column({nullable:false,length:20})
    estado:EstadoInscripcion



}
