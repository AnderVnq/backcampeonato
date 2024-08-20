import { BadRequestException, Body, Controller, Get, Param, Patch, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { BasesService } from './bases.service';
import { CrearBaseDto } from './dto/crear-base.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/superuser.guard';
import { IsSuperuser } from 'src/decorators/admin.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
//import { multerConfig } from 'src/config/multer-config';
import { UpdateBaseNombre } from './dto/update.nombre.dto';
import { FileValidationPipe } from 'src/middlewares/file-middleware';

@Controller('bases')
export class BasesController {

    constructor(
        private readonly baseService:BasesService
    ){}


    @Get()
    get_bases(){
        return this.baseService.get_all()
    }
//
    //@IsSuperuser()
    //@UseGuards(JwtAuthGuard,AdminGuard)
    @UsePipes(new ValidationPipe({whitelist:true}),FileValidationPipe)
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    create_base(@UploadedFile() file:Express.Multer.File, @Body() base:CrearBaseDto){

        if(!file){
            throw new  BadRequestException('No se cargó ningun archivo')
        }


        return  this.baseService.create_base(base,file)
    }
    /*
        esto se puede hacer pero que apunte y se guarde en un bucket de s3
    */



    @IsSuperuser()
    @UseGuards(JwtAuthGuard,AdminGuard)
    @UsePipes( new ValidationPipe({whitelist:true}))
    @Patch(':id')
    update_bases(@Param('id') id:string, @Body() base:UpdateBaseNombre){
        const id_number=parseInt(id)
        return this.baseService.update_nombre_base(id_number,base)
    }

}
