import { Component, OnInit, ɵConsole } from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {AnimalService} from '../../services/animal.service';
import {Global} from '../../services/global';
import {Animal} from '../../models/animal';
@Component({
  selector: 'animal-detail',
  templateUrl: './animal.detail.component.html',
  providers:[AnimalService] 
})
export class AnimalDetailComponent implements OnInit {

  public animal : Animal;
  public url : string;
  public animalDetalle;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _animalService :AnimalService,

  ){
    this.url = Global.url;

  }
  ngOnInit(){
    this.getAnimal();
 
  }
  getAnimal(){
    this._route.params.forEach((params: Params) =>{
      let id= params['id'];
      this._animalService.getanimal(id).subscribe(
        response =>{
        
          this.animalDetalle = response;
          console.log(this.animalDetalle);
          if(!this.animalDetalle.animal){
            this._router.navigate(['/home']);
          }else{
            this.animal = this.animalDetalle.animal;
            console.log(this.animal);
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/home']);
        }
      );
    });
  }
}
