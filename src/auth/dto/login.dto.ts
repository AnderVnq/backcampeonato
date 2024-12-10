import { IsNotEmpty, MaxLength} from "class-validator"

export class LoginUser{

    @IsNotEmpty({message:'El username no debe estar vacio'})
    @MaxLength(30,{message:'el username/email no debe exceder de 30 caracteres'})
    username:string

    @IsNotEmpty({message:'La contraseña no debe estar vacia'})
    password:string

}