import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { CampeonatosService } from 'src/campeonatos/campeonatos.service';
import { MailerService } from '@nestjs-modules/mailer';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Mail } from './entities/mail.entity';
import { Repository } from 'typeorm';
import { PayloadInterface } from 'src/auth/payload.interface';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class MailsService {

  constructor(

    @InjectRepository(Mail)
    private readonly mailService:Repository<Mail>,

    private readonly mailerService:MailerService,

    private readonly campeonatoService:CampeonatosService,

    private readonly userService:UsersService,

    private readonly jwtService:JwtService

  ){}



  async send_bases(createMailDto: CreateMailDto) {
    const { campeonato_id } = createMailDto;
  
    try {
      // Obtener información del campeonato
      const campeonato = await this.campeonatoService.findOne(campeonato_id);
      
  
      // Obtener información del usuario
      const usuario = await this.userService.find_By_Username(createMailDto.receptor);
  
      // Extraer categorías y file paths
      const categorias = campeonato.categorias;

      const nombres_cat = categorias.map(categoria=>categoria.nombre)
      const nombres_cat_join = nombres_cat.join(', ')

      const bases = categorias.map(categoria => {
        return {
          nombre: categoria.bases.nombre,
          filePath: categoria.bases.filePath 
        };
      });
      await this.mailerService.sendMail({
        to: usuario.email,
        subject: 'Envio de bases del campeonato',
        template: './mail',
        context: {
          campeonato: campeonato.nombre,
          name: usuario.first_name,
          activationLink: usuario.image,
          bases: bases
        }
      });
      
      const new_email= this.mailService.create(createMailDto)
      new_email.bases = nombres_cat_join

      await this.mailService.save(new_email)
      // Log de éxito (opcional)
      console.log('Correo enviado exitosamente a', createMailDto.receptor);
      return {
        message:"Correo enviado correctamente"
      }
  
    } catch (error) {
      // Manejo de errores
      console.error('Error al enviar el correo:', error.message);
      throw new  BadRequestException({message:'Error al enviar correo',status:HttpStatus.BAD_REQUEST})
      // Opcionalmente, puedes manejar el error de otras formas, como notificar al usuario,
      // guardar el error en una base de datos, etc.
    }
  }
  

  async send_reset_password(username:string){
    try {

      // Obtener información del usuario
      const usuario = await this.userService.find_By_Username(username);

      const payload:PayloadInterface ={
        id:usuario.id,
        username:usuario.username,
        email:usuario.email,
        first_name:usuario.first_name,
        last_name:usuario.last_name,
        image:usuario.image,
        is_superuser:usuario.is_superuser,
        is_staff:usuario.is_staff
      } 

      const token = this.jwtService.sign(payload)
      const url:string=`http://localhost:3000/auth/reset-password?ath=${token}`
      await this.mailerService.sendMail({
        to: usuario.email,
        subject: 'Change Password',
        template: './resetpassword',
        context: {
          name: usuario.first_name,
          resetLink:url
        }
      });
      
      const new_email= this.mailService.create({
        receptor:usuario.email,
        motivo:"cambio de contraseña"
      })


      await this.mailService.save(new_email)
      // Log de éxito (opcional)
      return {
        message:"Correo enviado correctamente"
      }
  
    } catch (error) {
      // Manejo de errores
      console.error('Error al enviar el correo:', error.message);
      throw new  BadRequestException({message:'Error al enviar correo',status:HttpStatus.BAD_REQUEST})
    }
  }

  async findAll() {
    return `This action returns all mails`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  async remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
