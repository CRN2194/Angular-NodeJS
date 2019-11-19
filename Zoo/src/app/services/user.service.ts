import{Injectable} from '@angular/core';
import{HttpClient , HttpResponse, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';//Sirve para recojer los valores de peticion de ajax
import {Observable} from 'rxjs';
import {Global} from './global';


@Injectable()
export class UserService{
    public url: string;
    public identity;
    public token;
    constructor(private _http: HttpClient ){
        this.url = Global.url;
    }
    register(user_to_register){
        let params =JSON.stringify(user_to_register); //convierte json a strng
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this._http.post(this.url + 'register', params, {headers: headers});
        //return this._http.post(this.url + 'register', params, {headers}).pipe(map((res: any) => res.json));
        
    }
    signup(user_to_login,gettoken=null){

        if(gettoken !=null){
            user_to_login.gettoken =gettoken;
        }
        let params = JSON.stringify(user_to_login);
        let headers = new HttpHeaders({'Content-Type':'application/json'});
        return this._http.post(this.url + 'login', params, {headers: headers});
        //return this._http.post(this.url+'login',params,{headers: headers});

    }
    getIdentity(){
        let identity =JSON.parse(localStorage.getItem('identity'));
        if(identity != "undefined"){
            this.identity =identity;
        }else{
            this.identity =null;
        }
        return this.identity;
    }
    getToke(){
        let token = localStorage.getItem('token');
        if(token != "undefined"){
            this.token = token;
        }else{
            this.token=null;
        }
        return this.token;
    }
    updateUser(user_to_update){
        let params = JSON.stringify(user_to_update);
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': this.getToke()
        });
        console.log(user_to_update._id);
        return this._http.put(this.url+'updateUser/'+user_to_update._id, params, {headers:headers});
        //return this._http.put(this.url+'updateUser/'+user_to_update._id,params,{headers}).pipe(map((res: any) => res.json());
        
    }
    getKeepers(){
      
        return this._http.get(this.url + 'getkeepers');       
    } 
}