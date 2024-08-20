import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"


export class ResetPassDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message:'el username debe tener al menos 6 caracteres'})
    @MaxLength(15,{message:'el username no debe exceder de 15 caracteres'})
    password:string
    @IsNotEmpty()
    @IsString()
    @MinLength(6,{message:'el username debe tener al menos 6 caracteres'})
    @MaxLength(15,{message:'el username no debe exceder de 15 caracteres'})
    validate_password:string

}