import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/superuser.guard';
import { IsSuperuser } from 'src/decorators/admin.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
//import { createUserAdminDto } from './dto/create_useradmin.dto';


@Controller('users')
export class UsersController {
    //usersService:UsersService

    constructor(private usersService:UsersService){}
    
    @IsSuperuser()
    @UseGuards(JwtAuthGuard,AdminGuard)
    @Get()
    getUsers(){
        return this.usersService.get_all()
    }


    @Post()
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@UploadedFile() file:Express.Multer.File ,@Body() user:createUserDto){
        return this.usersService.create_user(user,file)
    }

    @Get(':id')
    findOne(@Param() id:string){
        return this.usersService.findOne(id)
    }
    



    @Post(':id/upload-image')
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new ValidationPipe({ whitelist: true }))
    uploadImageUser(@UploadedFile()file:Express.Multer.File,@Param() id:string){
        return this.usersService.Upload_image_user(file,id)
    }

}
