
import{Component, OnInit} from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import{User} from '../../models/user';
import{Global} from '../../services/global';
import{UserService} from '../../services/user.service';
@Component({
    selector:'register',
    templateUrl: './register.component.html',

})
export class RegisterComponent implements OnInit{
    public title: String;
    public user: User;
    public status: string;
    public UserToRegister;

    constructor(
        private _route: ActivatedRoute, 
        private _router: Router,
        private _userService: UserService
        ){
            this.title ='Registro';
            this.user =new User("","","","","","ROLE_USER","");
        
        }
    onSubmit() { 
        this._userService.register(this.user).subscribe(//recoje el dato desde registro
        response =>{
            this.UserToRegister = response;
            if(this.UserToRegister.user && this.UserToRegister.user._id){
               
                this.status="success";
                console.log(status);
            }else{
                this.status="error";

            }
            
            this.user =new User("","","","","","ROLE_USER","");
        },
        error =>{
            console.log(<any>error);
        });
    }
    ngOnInit(){
        console.log('register.component cargado');
      
    }
}