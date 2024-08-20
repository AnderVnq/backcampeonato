import { Equipo } from "src/equipos/entities/equipo.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Puntaje {
    @PrimaryGeneratedColumn('increment')
    id:number
    @ManyToOne(()=>Equipo,equipo => equipo.puntaje)
    equipo:Equipo // relacion con equipo
    @Column({nullable:true,default:0})
    partidos_jugados:number
    @Column({nullable:true,default:0})
    partidos_ganados:number
    @Column({nullable:true,default:0})
    partidos_perdidos:number
    @Column({nullable:true,default:0})
    partidos_empatados:number
    @Column({nullable:true,default:0})
    no_presentado:number
    @Column({nullable:true,default:0})
    goles_favor:number
    @Column({nullable:true,default:0})
    goles_contra:number
    @Column({nullable:true,default:0})
    diferencia_goles:number
    @Column({nullable:true,default:0})
    puntos:number

}
