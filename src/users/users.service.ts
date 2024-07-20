import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { createUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(Users)
    private userRepository:Repository<Users>
  ){}




  async get_all(): Promise<Users[]> {
    const usuarios = await this.userRepository.find();
    if (!usuarios.length) {
      throw new NotFoundException('No hay usuarios');
    }
    return usuarios;
  }



  async create_user(user:createUserDto):Promise<any>{

    const{username,email,dni}=user

    const exists= await this.userRepository.findOne({where:[{username:username},{email:email},{dni:dni}]})

    if (exists) {throw new BadRequestException('El usuario ya existe')} 
    const newuser=this.userRepository.create(user)

    return this.userRepository.save(newuser)
  }



  // async create_super_user(user:createUserAdminDto){

  //   const{...datauser}=user
  //   datauser.is_superuser=true

  //   const exists= await this.userRepository.findOne({where:[{username:datauser.username},{email:datauser.email},{dni:datauser.dni}]})

  //   if (exists) {throw new BadRequestException('El usuario ya existe')} 
  //   const newuser=this.userRepository.create(user)
  //   return this.userRepository.save(newuser)

  // }

 


}
