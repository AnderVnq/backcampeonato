import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, /*IsUrl ,*/ MinLength } from "class-validator"
import { IsDNI } from "../constraints/dni.constraints"

export class createUserDto{

    @IsString()
    @IsNotEmpty()
    first_name:string
    @IsString()
    @IsNotEmpty()
    last_name:string
    @IsString()
    @MinLength(6,{message:'el username debe tener al menos 6 caracteres'})
    username:string

    @IsString()
    @MinLength(6,{message:'el password debe tener al menos 6 caracteres'})
    password:string

    @IsEmail({},{message:'debes ingresar un correo valido'})
    email:string

    // @IsUrl()
    // image?:string

    @IsDNI()
    dni:string

    @IsBoolean()
    @IsOptional()
    is_staff:boolean

    @IsBoolean()
    @IsOptional()
    is_superuser:boolean




}






