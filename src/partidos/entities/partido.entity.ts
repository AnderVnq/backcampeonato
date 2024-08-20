import { Arbitro } from "src/arbitros/entities/arbitro.entity"
import { Campeonatos } from "src/campeonatos/entities/campeonato.entity"
import { Equipo } from "src/equipos/entities/equipo.entity"
import { Goles } from "src/goles/entities/gole.entity"
import { Sancion } from "src/sanciones/entities/sancione.entity"
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Partido {
    @PrimaryGeneratedColumn('increment')
    id:number
    @ManyToOne(()=>Campeonatos,campeonato=>campeonato.partido)
    campeonato:Campeonatos
    @Column({nullable:false})
    fase:string//enum grupos cuartos semis final etc //se relaciona indirectamente
    @ManyToOne(()=>Equipo,equipo=>equipo.equipoA)
    equipo_local:Equipo

    @ManyToOne(()=>Equipo,equipo=>equipo.equipoB)
    equipo_visitante:Equipo

    @Column({type:'timestamp',nullable:false})
    fecha:Date


    @Column({nullable:false})
    estado:string //enum sin jugar , jugado o en proceso   si la fecha es mayor a 1 dia sera jugado si es el mismo dia en proceso de lo contrario sin jugar
    @ManyToMany(()=>Arbitro,arbitros=>arbitros.partido,{eager:true})
    @JoinTable({
        name:'partido_arbitro',
        joinColumn:{name:'partido_id'},
        inverseJoinColumn:{name:'arbitro_id'}
    })
    arbitros:Arbitro[] // relacion muchos a muchos con arbitro

    //goles:number // relacion con goles uno a muchos

    @OneToMany(()=>Sancion,sancion=>sancion.partido)
    sancion:Sancion[]

    @OneToMany(()=>Goles,goles=>goles.partido)
    goles:Goles[]

    @Column({nullable:true,default:0})
    goles_local:number

    @Column({nullable:true,default:0})
    goles_visitante:number
    
}
