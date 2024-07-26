import { Categorias } from "src/categorias/categorias.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";



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

    @ManyToMany(()=>Categorias,(categoria)=> categoria.campeonato,{eager:true})
    @JoinTable({
        name:'campeonato_categoria',
        joinColumn:{name:'campeonato_id',},
        inverseJoinColumn:{name:'categoria_id'}
    })
    categorias:Categorias[]
}
