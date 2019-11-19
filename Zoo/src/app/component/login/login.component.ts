'use strict';
import{Component, OnInit} from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import{User} from '../../models/user';
import{UserService} from '../../services/user.service';

@Component({
    selector:'login',
    templateUrl: './login.component.html',
    providers:[UserService]
})
export class LoginComponent implements OnInit{
    public title: String;
    public user:User;
    public identity;
    public token;
    public status: string;
    constructor(
        private _route: ActivatedRoute, 
        private _router: Router,
        private _userService:UserService
        ){
            this.title ='Identificate';
            this.user =new User("","","","","","ROLE_USER","");
        }
    ngOnInit(){
        console.log('login.component cargado');
        console.log(this._userService.getIdentity());
        console.log(this._userService.getToke());
     
    }
    onSubmit(){
      
        //Logeo y conseguir datos
        this._userService.signup(this.user).subscribe(
            response =>{
               
                this.identity = response;
                if(!this.identity.user || !this.identity.user._id){
                 
                    alert('El usuario no se ha loegado correctamente');
                }else{

                    this.identity.password = '';
                    localStorage.setItem('identity',JSON.stringify(this.identity.user));//solo numeros o string
                    //Conseguir token 
                    this._userService.signup(this.user,'true').subscribe(
                        response =>{
                            this.token = response;
                            //
                  
                   
                            if(this.token.length <=0 ){
                                alert('El token no se ha generado');
                        
                            }else{
                             
                                localStorage.setItem('token',JSON.stringify(this.token.token));//solo numeros o string
                                this.status="success";
                                console.log(this.status);
                                this._router.navigate(['/home']);
                            }
                        },
                        error =>{
                       
                            console.log(<any>error);
                        }
                    );


                    
                }
            },
            error =>{
                console.log(<any>error);
                /*
                var errorMenssage =<any>error;
                if(errorMenssage != null){
                    var body = JSON.parse(error._body);
                    this.status="Error";
                }*/
            }
        );
    }

}