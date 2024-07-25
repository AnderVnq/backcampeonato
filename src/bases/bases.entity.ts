import { Categorias } from "src/categorias/categorias.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Bases{

    @PrimaryGeneratedColumn('increment')
    id: number;
    
    @Column({length:40})
    nombre:string

    @Column()
    filePath: string;
    
    @OneToOne(() => Categorias, (category) => category.bases)
    categoria: Categorias;
}