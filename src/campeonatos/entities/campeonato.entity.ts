import { Categorias } from "src/categorias/categorias.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Campeonatos {

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({nullable:false})
    nombre:string

    @Column({type:'date',nullable:false})
    fecha_inicio:Date

    @Column({type:'date',nullable:true})
    fecha_fin:Date

    @Column()
    lugar:string

    @OneToMany(()=>Categorias,(categoria)=> categoria.campeonato)
    categorias:Categorias
}
