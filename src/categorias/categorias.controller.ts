import { Body, Controller, Get, Param, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CrearCategoriaDto } from './dto/crear-categoria.dto';
import { IsSuperuser } from 'src/decorators/admin.decorator';
import { AdminGuard } from 'src/guards/superuser.guard';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
//import { AdminGuard } from 'src/guards/superuser.guard';
//import { AdminGuard } from 'src/guards/superuser.guard';
//import { IsSuperuser } from 'src/decorators/admin.decorator';

@Controller('categorias')
export class CategoriasController {

    constructor(
      private readonly categoriaService:CategoriasService  
    ){}

    //@IsSuperuser()
    @UseGuards(JwtAuthGuard)
    @Get()
    get_categorias(){
        return this.categoriaService.get_all()
    }


    @IsSuperuser()
    @UseGuards(JwtAuthGuard,AdminGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Post()
    create_categoria(@Body() categoria:CrearCategoriaDto){
        return this.categoriaService.create_categorias(categoria)
    }




    //@IsSuperuser()
    //@UseGuards(JwtAuthGuard,AdminGuard)
    @UsePipes(new ValidationPipe({whitelist:true}))
    @Patch(':id')
    update_categoria(@Param('id') id:string , @Body() categoria:UpdateCategoriaDto ){
        const id_number = parseInt(id)
        return this.categoriaService.update_categoria(id_number,categoria)
    }



}
