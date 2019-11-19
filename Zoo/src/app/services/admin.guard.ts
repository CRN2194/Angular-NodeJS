import  {Injectable} from '@angular/core';
import {UserService} from './user.service';
import { Router,CanActivate } from '@angular/router';
@Injectable()

//Con esta clase se puede restringir el ingreso via url a personas que no sean admin
export class AdminGuard implements CanActivate{

    constructor(
        private _router: Router,
        private _userService: UserService
        ){}

    canActivate(){
        let identity = this._userService.getIdentity();
        if(identity && identity.role =='ROLE_ADMIN'){
            return true;
        }
        this._router.navigate(['./']);
        return false;
        }
}