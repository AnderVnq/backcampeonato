import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { createNewUserDto } from './dto/new-user.dto';
import { LoginUser } from './dto/login.dto';
import { compare } from 'bcrypt';
import { PayloadInterface } from './payload.interface';
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from '@nestjs/jwt';
import { ResetPassDto } from './dto/reset_password.dto';
import { FirebaseStorageProvider } from 'src/shared/firebase-storage.provider';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users)
        private authRepository:Repository<Users>,
        private jwtService:JwtService,
        private readonly storageProvider:FirebaseStorageProvider
    ){}


    async get_all(): Promise<Users[]> {
        const usuarios = await this.authRepository.find();
        if (!usuarios.length) {
          throw new NotFoundException('No hay usuarios');
        }
        return usuarios;
    }



    async create_user(image:Express.Multer.File,user:createNewUserDto):Promise<any>{

        const{username,email,dni}=user
    
        const exists= await this.authRepository.findOne({where:[{username:username},{email:email},{dni:dni}]})
        
        const {url}= await this.storageProvider.upload(image,'users-images',user.username)
        //console.log("asdasdasd")
        //console.log(file)
        if (exists) {throw new BadRequestException('El usuario ya existe')} 
        const newuser=this.authRepository.create({
            ...user,
            image:url
        })
    
        return this.authRepository.save(newuser)
    }



    async login(dto:LoginUser):Promise<any>{
       
        const {username}=dto
        const user = await this.authRepository.findOne({where:[{username:username},{email:username}]})
        if(!user){
            throw new UnauthorizedException('Credenciales no validas o usuario no existente')
        }
        const password_validate= await compare(dto.password,user.password)
        if(!password_validate){
            throw new UnauthorizedException('Contraseña Erronea')
        }

        const payload:PayloadInterface = {
            id:user.id,
            username:user.username,
            email:user.email,
            first_name:user.first_name,
            last_name:user.last_name,
            image:user.image,
            is_superuser:user.is_superuser,
            is_staff:user.is_staff
        }

        const token = this.jwtService.sign(payload)
        const decode = this.jwtService.verify(token)
        console.log(decode)
        return {
            isSuccess:true,
            token:token
        }
    }




    async reset_password(token:string,dto:ResetPassDto):Promise<object>{


        try{

            const {password,validate_password}=dto
            const payload_decode = this.jwtService.verify(token)

            if(password !== validate_password){
                throw new BadRequestException('Error las contraseñas no son iguales')
            }

            const user = await this.authRepository.findOne({where:{username:payload_decode.username}})

            if(!user){
                throw new BadRequestException('Error al encontrar usuario')
            }

            user.password=validate_password

            await this.authRepository.save(user)

            return{
                message:"Contraseña Actualizada Correctamente",
                status:HttpStatus.OK
            }

        }
        catch(error){
            if (error instanceof TokenExpiredError) {
                // Token ha expirado
                throw new UnauthorizedException('Token expirado');
              } else if (error instanceof JsonWebTokenError) {
                // Firma del token inválida
                throw new UnauthorizedException('Token inválido');
              } else if (error instanceof NotBeforeError) {

                throw new UnauthorizedException('Token no válido antes de la fecha');

              } else {
                // Otros errores
                throw new UnauthorizedException('Error de verificación de token');
              }
        }
    }

    async change_password(id_user:string,dto:ResetPassDto){

        const {password,validate_password}=dto
        const user = await this.authRepository.findOne({where:{id:id_user}})

        if(!user){
            throw new NotFoundException('Usuario no encontrado')
        }

        if(password !== validate_password){
            throw new BadRequestException('Error las contraseñas no son iguales')
        }

        user.password= validate_password

        await this.authRepository.save(user)

        return{
            message:"Contraseña cambiada correctamente",
            status:HttpStatus.OK
        }

    }




    

    

}
