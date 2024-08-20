import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createNewUserDto } from './dto/new-user.dto';
import { LoginUser } from './dto/login.dto';
import { ResetPassDto } from './dto/reset_password.dto';
import { FileInterceptor } from '@nestjs/platform-express';
//import { FileValidationPipe } from 'src/middlewares/file-middleware';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}


    @Get()
    getUsers(){
        return this.authService.get_all()
    }

    @Post('register')
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() user: createNewUserDto,@UploadedFile() image: Express.Multer.File) {
      //console.log('Uploaded file:', image);
      //console.log('User data:', user);
      return this.authService.create_user(image, user);
    }



    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('login')
    login(@Body() payload:LoginUser){
        return this.authService.login(payload)
    }


    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post(':id/change-password')
    reset_password(@Param('id') id:string , @Body() payload:ResetPassDto){
        return this.authService.change_password(id,payload)
        //return this.authService.reset_password(,payload)
    }
    

    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('reset-password')
    change_password(@Query('ath') ath:string , @Body() payload:ResetPassDto){
        return this.authService.reset_password(ath,payload)
    }

}
