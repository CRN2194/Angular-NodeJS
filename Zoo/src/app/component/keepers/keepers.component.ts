import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Global} from '../../services/global';
@Component({
    selector: 'keepers',
    templateUrl: './keepers.component.html',
    providers:[UserService]
  })
  export class KeepersComponent implements OnInit {
    public title: string;
    public user: User[];
    public cuidadoresActuales;
    public url: string;
    constructor(
      private _userService : UserService
    ){
      this.title="Cuidadores";
      this.url = Global.url;
    }

    ngOnInit(){
        console.log('keepers.component cargado');
        this.getKeepers();
    }
    getKeepers(){
      this._userService.getKeepers().subscribe(
        response =>{
          
          this.cuidadoresActuales =response;
          //console.log(this.animalesActuales);
          if(!response){
            //this._router.navigate(['./']);
          }else{
            this.user = this.cuidadoresActuales.users;
            console.log(this.user);
          }
        },
        error =>{
          console.log(<any>error);
        }
      );
    }
  }