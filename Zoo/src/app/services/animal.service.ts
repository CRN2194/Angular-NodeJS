import{Injectable} from '@angular/core';
import{HttpClient , HttpResponse, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';//Sirve para recojer los valores de peticion de ajax
import {Observable} from 'rxjs';
import {Global} from './global';


@Injectable()
export class AnimalService{
    public url: string;

    constructor(private _http: HttpClient ){
        this.url = Global.url;
    }
    addAnimal(token,animal){
      
        let params = JSON.stringify(animal);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.post(this.url + 'animal', params, {headers: headers});
    }
    getAnimals(){
      
        return this._http.get(this.url + 'animals');       
    }   
    getanimal(id){
        return this._http.get(this.url + 'animal/'+id);    
    }
    editAnimal(token, id, animal){
        let params = JSON.stringify(animal);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'animals/'+id, params, {headers: headers});
    }
    deleteAnimal(token,id){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.delete(this.url + 'animal/'+id, {headers: headers});
    }
}
