import { Jugadores } from "src/jugadores/entities/jugadore.entity"
import { Partido } from "src/partidos/entities/partido.entity"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Goles {

    @PrimaryGeneratedColumn('increment')
    id:number 
    @ManyToOne(()=>Partido,partido=>partido.goles)
    partido:Partido //relacion con partido
    @ManyToOne(()=>Jugadores,jugadores=>jugadores.goles)
    jugador:Jugadores // relacion con jugador 
    @Column()
    minuto:string
}
