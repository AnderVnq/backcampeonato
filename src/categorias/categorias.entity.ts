import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CategoriaEnum } from "./categorias.enum";
import { Bases } from "src/bases/bases.entity";
import { Campeonatos } from "src/campeonatos/entities/campeonato.entity";
import { Jugadores } from "src/jugadores/entities/jugadore.entity";

@Entity()
export class Categorias{
    
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({nullable:false,length:20})
    nombre:CategoriaEnum


    //@ManyToOne(() => Campeonatos, (championship) => championship.categorias, { onDelete: 'CASCADE' })
    campeonato: Campeonatos[];

    @OneToOne(() => Bases, (base) => base.categoria, { cascade: true, eager: true })
    @JoinColumn()
    bases: Bases

    @OneToMany(()=>Jugadores,jugadores=> jugadores.categoria)
    jugadores:Jugadores[]
}