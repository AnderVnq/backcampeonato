import { Partido } from "src/partidos/entities/partido.entity"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Arbitro {

    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({nullable:false})
    nombre:string
    @Column({nullable:false})
    primer_apellido:string
    @Column({nullable:false})
    segundo_apellido:string
    @Column({nullable:false,length:9})
    telefono:string
    @Column({nullable:false,length:8,unique:true})
    dni:string

    partido:Partido[]
}
