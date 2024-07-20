import {IsEmail, IsNotEmpty, IsString, IsUrl, MaxLength, MinLength } from "class-validator"
import { IsDNI } from "src/users/constraints/dni.constraints"


export class createNewUserDto{

    @IsString()
    @IsNotEmpty()
    first_name:string
    @IsString()
    @IsNotEmpty()
    last_name:string
    @IsString()
    @MinLength(6,{message:'el username debe tener al menos 6 caracteres'})
    @MaxLength(15,{message:'el username no debe exceder de 15 caracteres'})
    username:string

    @IsString()
    @MinLength(6,{message:'el password debe tener al menos 6 caracteres'})
    password:string

    @IsEmail({},{message:'debes ingresar un correo valido'})
    email:string

    @IsUrl()
    image?:string

    @IsDNI()
    dni:string


}
