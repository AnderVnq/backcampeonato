import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Tipo } from "./categorias.enum";
import { Bases } from "src/bases/bases.entity";
import { Campeonatos } from "src/campeonatos/entities/campeonato.entity";

@Entity()
export class Categorias{
    
    @PrimaryGeneratedColumn('increment')
    id:number

    @Column({nullable:false})
    nombre:Tipo


    @ManyToOne(() => Campeonatos, (championship) => championship.categorias, { onDelete: 'CASCADE' })
    campeonato: Campeonatos;

    @OneToOne(() => Bases, (base) => base.categoria, { cascade: true, eager: true })
    @JoinColumn()
    bases: Bases


}