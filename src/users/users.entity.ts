import {BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm'
import { IsEmail, MinLength, IsBoolean, IsUrl, MaxLength } from 'class-validator';
import { hash } from 'bcrypt';



@Entity({name:'users'})
export class Users{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({nullable:false,type:'varchar'})
    first_name:string

    @Column({nullable:false})
    last_name:string

    @Column({nullable:false,unique:true,type:'varchar'})
    @MinLength(6,{message:'el username debe tener al menos 6 caracteres'})
    username:string

    @Column({nullable:false,type:'varchar'})
    @MinLength(6,{message:'el password debe tener al menos 6 caracteres'})
    //@MaxLength(15,{message:'el password no debe tener mas de 15'})
    password:string

    @Column({nullable:false})
    @IsEmail({},{message:'debes ingresar un correo valido'})
    email:string

    @Column({nullable:true})
    @IsUrl({},{message:'ingrese una imagen valida'})
    image:string

    @Column({default:false})
    @IsBoolean()
    is_superuser:boolean

    @Column({default:true})
    @IsBoolean()
    is_active:boolean

    @Column({default:false})
    @IsBoolean()
    is_staff:boolean

    @CreateDateColumn({type:'timestamp'})
    date_joined:Date 

    @Column({nullable:false,unique:true})
    @MinLength(8,{message:'El dni debe tener 8 caracteres'})
    @MaxLength(8,{message:'el dni debe tener maximo 8 caracteres'})
    dni:string



    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        if(!this.password){
            return
        }
        this.password=await hash(this.password,10) 
    }
}