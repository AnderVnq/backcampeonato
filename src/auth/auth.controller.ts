import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createNewUserDto } from './dto/new-user.dto';
import { LoginUser } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}


    @Get()
    getUsers(){
        return this.authService.get_all()
    }


    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('new-user')
    create(@Body() user:createNewUserDto){
        return this.authService.create_user(user)
    }



    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post('login')
    login(@Body() payload:LoginUser){
        return this.authService.login(payload)
    }


}
