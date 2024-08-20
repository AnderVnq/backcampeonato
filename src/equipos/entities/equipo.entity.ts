import { Grupos } from "src/grupos/entities/grupo.entity";
import { Inscripciones } from "src/inscripciones/entities/inscripcione.entity";
import { Jugadores } from "src/jugadores/entities/jugadore.entity";
import { Partido } from "src/partidos/entities/partido.entity";
import { Puntaje } from "src/puntajes/entities/puntaje.entity";
import { OneToMany, PrimaryGeneratedColumn,Column, Entity } from "typeorm";


@Entity()
export class Equipo {

    @PrimaryGeneratedColumn('increment')    
    id:number

    @Column({unique:true,nullable:false})
    nombre:string

    @Column({nullable:true})
    logo_equipo?:string

    @Column({nullable:false})
    delegado:string   //esto puede cambiar para que tenga relacion con el usuario para asi traer su foto

    @Column({nullable:false})
    lugar:string

    @OneToMany(() => Inscripciones, inscripciones => inscripciones.equipo)
    inscripciones: Inscripciones[];

    @OneToMany(()=>Jugadores,jugadores => jugadores.equipo )
    jugadores:Jugadores[]

    @OneToMany(()=>Grupos,grupos => grupos.equipo)
    grupos:Grupos[]

    @OneToMany(()=>Puntaje,puntaje =>puntaje.equipo)
    puntaje:Puntaje[]

    @OneToMany(()=>Partido,partido=>partido.equipo_local)
    equipoA:Partido[]
    @OneToMany(()=>Partido,partido=>partido.equipo_visitante)
    equipoB:Partido[]
    
}
