import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_SUPERUSER_KEY } from "src/decorators/admin.decorator";








@Injectable()
export class AdminGuard implements CanActivate{
    constructor(private reflector:Reflector ){}

    canActivate(context: ExecutionContext):boolean{
        const is_superuser_req= this.reflector.get<boolean>(IS_SUPERUSER_KEY,context.getHandler())

        if(!is_superuser_req){
            return true
        }

        const request = context.switchToHttp().getRequest()
        const user = request.user

        return user?.is_superuser===true

    }

}