import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { EstadoJugador } from "../enums/estado-jugador.enum";
import { PosicionJugador } from "../enums/posicion-jugador.enum";
import { Categorias } from "src/categorias/categorias.entity";
import { Equipo } from "src/equipos/entities/equipo.entity";

@Entity()
export class Jugadores {

    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({nullable:false})
    nombres:string
    @Column({nullable:false})
    primer_apellido:string
    @Column({nullable:false})
    segundo_apellido:string
    @Column({nullable:false,length:8})
    dni:string
    @Column({nullable:true})
    foto:string
    @Column({nullable:true})
    imagen_dni:string
    @Column({nullable:false,length:30})
    estado:EstadoJugador
    @Column({nullable:false,length:30})
    posicion_jugador:PosicionJugador
    @Column({nullable:false})
    direccion:string

    @OneToOne(()=> Categorias,(categoria)=>categoria.jugadores , {eager:true})
    @JoinColumn()
    categoria:Categorias

    @ManyToOne(()=>Equipo,(equipo)=>equipo.jugadores)
    @JoinColumn()
    equipo:Equipo




}
