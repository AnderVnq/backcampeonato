import { IsNotEmpty, MaxLength} from "class-validator"

export class LoginUser{

    @IsNotEmpty({message:'El username no debe estar vacio'})
    @MaxLength(15,{message:'el username no debe exceder de 15 caracteres'})
    username:string

    @IsNotEmpty({message:'La contraseña no debe estar vacia'})
    password:string

}