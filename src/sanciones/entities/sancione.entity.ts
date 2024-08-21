import { Jugadores } from "src/jugadores/entities/jugadore.entity"
import { Partido } from "src/partidos/entities/partido.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { EstadoSancion } from "../enums/estado-sancion.enum"

@Entity()
export class Sancion {

    @PrimaryGeneratedColumn('increment')
    id:number
    @Column()
    tipo:string //enum tarjetas u tra cosa
    @Column({nullable:true})
    minuto:string
    @Column()
    motivo:string
    @ManyToOne(()=>Partido,partido=>partido.sancion)
    partido:Partido // relacion con partido
    @ManyToOne(()=>Jugadores,jugadores=>jugadores.sancion)
    jugador:Jugadores // relacion con jugador
    @Column()
    estado:EstadoSancion // enum en proceso o finalizado
}
