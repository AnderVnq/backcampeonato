import { Campeonatos } from "src/campeonatos/entities/campeonato.entity"
import { Equipo } from "src/equipos/entities/equipo.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Grupos {

    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({nullable:true})
    nombre:string
    @OneToMany(()=>Equipo,equipo=>equipo.grupos)
    equipo:Equipo[] // relacion con equipo
    @OneToMany(()=>Campeonatos,campeonato=> campeonato.grupos)
    campeonato:Campeonatos[] // relacion con campeonato
}
