
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Mail {

    @PrimaryGeneratedColumn('increment')
    id:number
    @Column({default:'ndrsnvenegas@gmail.com'})
    emisor:string
    @Column()
    receptor:string
    @Column()
    motivo:string
    @CreateDateColumn({type:'timestamp'})
    fecha_envio:Date
    @Column({nullable:true})
    bases:string



}
