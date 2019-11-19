import { Component, OnInit } from '@angular/core';
import {Animal} from '../../models/animal';
import {AnimalService} from '../../services/animal.service';
import {Global} from '../../services/global';
@Component({
    selector: 'animals',
    templateUrl: './animals.component.html',
    providers:[AnimalService]
  })
  export class AnimalsComponent implements OnInit {
     public title;
     public url;
     public animal: Animal[];
     public animalesActuales;
    constructor(private _animalService : AnimalService){
      this.title = "Animales";
      this.url = Global.url;
    }

    ngOnInit(){
        console.log('animals.component cargado');
        this.getAnimals();
        console.log(this.animal);
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
  }
  