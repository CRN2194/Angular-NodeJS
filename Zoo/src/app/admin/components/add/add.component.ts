import { Component, OnInit, ɵConsole } from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {AnimalService} from '../../../services/animal.service';
import {UserService} from '../../../services/user.service';
import {UploadService} from '../../../services/upload.service';
import {Global} from '../../../services/global';
import {Animal} from '../../../models/animal';
@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  providers:[UserService,AnimalService,UploadService] //clases a utilizar
})
export class AddComponent implements OnInit {
  public title: string;
  public animal :Animal;
  public identity;
  public token;
  public url: string;
  public status;
  public animalAnadir;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService :UserService,
    private _animalService :AnimalService,
    private _uploadService : UploadService
  ){
    this.title ='Añadir';
    this.animal = new Animal('','','',2019,'','');
    this.identity =this._userService.getIdentity();
    this.token =this._userService.getToke();
    this.url =Global.url;

  }
  ngOnInit(){
    console.log("animaladdcomponent cargado");
  }
  onSubmit(){
   
    //rellenar en bd
    this._animalService.addAnimal(this.token,this.animal).subscribe(
      response =>{
        this.animalAnadir = response; 
        console.log(this.fileToUpload);       
        if(!this.animalAnadir.animal){
          this.status='error';
        }else{
          this.status='success';
          this.animal = this.animalAnadir.animal;
          //Subir imagen
          if(!this.fileToUpload){
            this._router.navigate(['/admin-panel-listado'])
          }else{
            this._uploadService.makeFileRequest(this.url+'upload-image-animal/'+this.animal._id,[],this.fileToUpload,this.token,'image')
            .then((result:any)=>{
                this.animal.image =result.image;
                console.log(this.animal);
                this._router.navigate(['./admin-panel/listado']);
            });
          }

          
        }
      },
      error =>{
        var errorMessage = <any>error;
        if(errorMessage !=null){
          this.status ='error';
        }
      }
    );
  }
  public fileToUpload: Array<File>;
  fileChangeEvent(fileInput: any){
      this.fileToUpload = <Array<File>>fileInput.target.files;
      console.log(this.fileToUpload);
    }
}
