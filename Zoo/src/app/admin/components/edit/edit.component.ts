import { Component, OnInit, ɵConsole } from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import {AnimalService} from '../../../services/animal.service';
import {UserService} from '../../../services/user.service';
import {UploadService} from '../../../services/upload.service';
import {Global} from '../../../services/global';
import {Animal} from '../../../models/animal';
@Component({
  selector: 'admin-edit',
  templateUrl: '../add/add.component.html',
  providers:[UserService,AnimalService,UploadService] //clases a utilizar
})
export class EditComponent implements OnInit {
  public title: string;
  public animal :Animal;
  public identity;
  public token;
  public url: string;
  public status;
  public animalAnadir;
  public animalDetalle;
  public is_edit;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService :UserService,
    private _animalService :AnimalService,
    private _uploadService : UploadService
  ){
    this.title ='Editar';
    this.animal = new Animal('','','',2019,'','');
    this.is_edit=true;
    this.identity =this._userService.getIdentity();
    this.token =this._userService.getToke();
    this.url =Global.url;

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
         
          }
        },
        error =>{
          console.log(<any>error);
          this._router.navigate(['/home']);
        }
      );
    });
  }

  ngOnInit(){
    console.log("Editcomponent cargado");
    this.getAnimal();
  }
  onSubmit(){
   
    //rellenar en bd
    this._animalService.editAnimal(this.token,this.animal._id,this.animal).subscribe(
      response =>{
        this.animalAnadir = response;   
        if(!this.animalAnadir.animal){
          this.status='error';
        }else{
          this.status='success';
          this.animal = this.animalAnadir.animal;
          //Subir imagen
          console.log(this.animal._id);
          if(!this.fileToUpload){
         
            this._router.navigate(['/animal',this.animal._id]);
          }else{
            this._uploadService.makeFileRequest(this.url+'upload-image-animal/'+this.animal._id,[],this.fileToUpload,this.token,'image')
            .then((result:any)=>{
                this.animal.image =result.image;
                console.log(this.animal);
                this._router.navigate(['/animal',this.animal._id]);
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
