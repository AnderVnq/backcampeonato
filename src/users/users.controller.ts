import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { AdminGuard } from 'src/guards/superuser.guard';
import { IsSuperuser } from 'src/decorators/admin.decorator';
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


    @UsePipes(new ValidationPipe({ whitelist: true }))
    @Post()
    create(@Body() user:createUserDto){
        return this.usersService.create_user(user)
    }

    // @UsePipes(new ValidationPipe({ whitelist: true }))
    // @Post()
    // create_admin(@Body() admin:createUserAdminDto){
    //     return this.usersService.create_super_user(admin)
    // }



}
