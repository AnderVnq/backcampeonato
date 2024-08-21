import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { createUserDto } from './dto/create-user.dto';
import { FirebaseStorageProvider } from 'src/shared/firebase-storage.provider';

import { getFirestore, doc, updateDoc } from 'firebase/firestore';

@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(Users)
    private userRepository:Repository<Users>,
    private readonly storageProvider:FirebaseStorageProvider
  ){}




  async get_all(): Promise<Users[]> {
    const usuarios = await this.userRepository.find();
    if (!usuarios.length) {
      throw new NotFoundException('No hay usuarios');
    }
    return usuarios;
  }



  async create_user(user:createUserDto, image:Express.Multer.File):Promise<Users>{

    const{username,email,dni}=user

    const exists= await this.userRepository.findOne({where:[{username:username},{email:email},{dni:dni}]})

    if (exists) {throw new BadRequestException('El usuario ya existe')} 

    const {url}= await this.storageProvider.upload(image,'user-images',user.username)


    const newuser=this.userRepository.create({
      ...user,
      image:url
    })

    return await this.userRepository.save(newuser)//a
  }


  async findOne(id:string):Promise<Users>{
    const user = await this.userRepository.findOne({where:{id:id}})
    if(!user){
      throw new NotFoundException('Usuario no encontrado')
    }

    return user
  }

  async find_By_Username(username:string):Promise<Users>{
    const user = await this.userRepository.findOne({where:{username:username}})
    if(!user){
      throw new NotFoundException('Usuario no encontrado')
    }

    return user
  }
  


  async Upload_image_user(file:Express.Multer.File ,id:string){

    const user= await this.userRepository.findOne({where:{id:id}})

    if(!user){
      throw new NotFoundException("El usuario no existe")
    }

    try{
      const result = await this.storageProvider.upload(file,'users_images',user.username)
      const url = result.url
      const firestore = getFirestore();
  
      const user_doc_ref = doc(firestore,'users-images',user.username)
  
      const update = await updateDoc(user_doc_ref,{ profilePhotoURL: url })
      
      console.log(update)
  
      return {
        message:'Imagen actualizada correctamente',
        url: url,
        status:HttpStatus.OK
      }
    }
    catch(error){
      throw new BadRequestException(`Error al actualizar imagen ${error.message}`)
    }
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
