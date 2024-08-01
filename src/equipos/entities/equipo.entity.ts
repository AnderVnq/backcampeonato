import { Inscripciones } from "src/inscripciones/entities/inscripcione.entity";
import { Jugadores } from "src/jugadores/entities/jugadore.entity";
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
    
}
