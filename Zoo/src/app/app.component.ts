import { Component, OnInit,DoCheck } from '@angular/core';
import {UserService} from './services/user.service';
import{Router, ActivatedRoute, Params} from '@angular/router';
import{Global} from './services/global';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit, DoCheck  {
  public title: string;
  public identity;
  public url: string;
  constructor(
    private _userService :UserService,
    private _route: ActivatedRoute, 
    private _router: Router
  ){
    this.title = 'Zoo';
    this.url = Global.url;
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity(); //usuario logeado
    console.log(this.identity);
  }
  ngDoCheck(){
    this.identity = this._userService.getIdentity(); //para q cargue los datos cuando detecte un cambio
  }
  logout(){
        localStorage.clear();
        this.identity=null;
        this._router.navigate(['/']);
  }
}
