import { Categorias } from "src/categorias/categorias.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Bases{

    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    filePath: string;
  
    @OneToOne(() => Categorias, (category) => category.bases)
    categoria: Categorias;
}