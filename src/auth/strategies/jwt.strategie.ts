import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constans';
//import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from '../payload.interface';
import { Repository } from 'typeorm';
import { Users } from 'src/users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(

    @InjectRepository(Users)
    private readonly authRepository:Repository<Users>,

    private readonly configService:ConfigService,
    //private readonly jwtService:JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET)
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.authRepository.findOne({where:[{username:payload.username},{email:payload.email}]})
    //console.log(user)
    if(!user){return new UnauthorizedException('credenciales erroneas')}
    return payload

  }
}