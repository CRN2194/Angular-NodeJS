import { Component, OnInit, ɵConsole } from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {AnimalService} from '../../../services/animal.service';
import {UserService} from '../../../services/user.service';
import {UploadService} from '../../../services/upload.service';
import {Global} from '../../../services/global';
import {Animal} from '../../../models/animal';
//Declara jquery y $ para poder utilizar
import * as $ from 'jquery';
@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers:[AnimalService,UserService] 
})
export class ListComponent implements OnInit {
  public title: string;
  numbers = [0,1,2,3,4,5];
  public animal : Animal[];
  public animalesActuales;
  public token;
  public busqueda;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService :AnimalService,
    private _userService : UserService

  ){
    this.title ='Listado de animales';
  }
  ngOnInit(){
    this.token = this._userService.getToke();
    this.getAnimals();
  }
  getAnimals(){
    this._animalService.getAnimals().subscribe(
      response =>{
        
        this.animalesActuales =response;
        //console.log(this.animalesActuales);
        if(!response){
          //this._router.navigate(['./']);
        }else{
          this.animal = this.animalesActuales.animals;
          console.log(this.animal);
        }
      },
      error =>{
        console.log(<any>error);
      }
    );
  }
  deleteAnimal(id){
    $('#myModal-'+id).modal('hide');
    this._animalService.deleteAnimal(this.token, id).subscribe(
      
      response=>{
       
        if(!response){
          alert("Error en el servidor");
        }else{
          this.getAnimals();
        }
      },
      error=>{
        alert("Error");
      });
  }
}
