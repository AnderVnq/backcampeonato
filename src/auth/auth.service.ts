import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import { createNewUserDto } from './dto/new-user.dto';
import { LoginUser } from './dto/login.dto';
import { compare } from 'bcrypt';
import { PayloadInterface } from './payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(Users)
        private authRepository:Repository<Users>,
        private jwtService:JwtService
    ){}


    async get_all(): Promise<Users[]> {
        const usuarios = await this.authRepository.find();
        if (!usuarios.length) {
          throw new NotFoundException('No hay usuarios');
        }
        return usuarios;
    }



    async create_user(user:createNewUserDto):Promise<any>{

        const{username,email,dni}=user
    
        const exists= await this.authRepository.findOne({where:[{username:username},{email:email},{dni:dni}]})
    
        if (exists) {throw new BadRequestException('El usuario ya existe')} 
        const newuser=this.authRepository.create(user)
    
        return this.authRepository.save(newuser)
    }



    async login(dto:LoginUser):Promise<any>{
        const {username}=dto
        const user = await this.authRepository.findOne({where:[{username:username},{email:username}]})
        if(!user){
            return new UnauthorizedException('Credenciales no validas o usuario no existente')
        }
        const password_validate= await compare(dto.password,user.password)
        if(!password_validate){
            return new UnauthorizedException('Contraseña Erronea')
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
        return [token]
    }

    

}
