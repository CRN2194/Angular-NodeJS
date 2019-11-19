import {Component, OnInit} from '@angular/core';
import{Router, ActivatedRoute, Params} from '@angular/router';
import{User} from '../../models/user';
import{Global} from '../../services/global';
import{UserService} from '../../services/user.service';
import{UploadService} from '../../services/upload.service';
@Component ({
    selector :'user-edit',
    templateUrl: './user-edit.component.html',
    providers: [UserService,UploadService]
})
export class UserEditComponent implements OnInit{
    public title: string;
    public user:User;
    public identity;
    public token;
    public status;
    public userToEdit;
    public url: string;
    constructor(
        private _userService: UserService,
        private _uploadService: UploadService
    ){
        this.title ='Actualizar datos';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToke();
        this.user = this.identity;
        this.url =Global.url;
    }
    ngOnInit(){
        console.log("Componente cargado user-edit");
        console.log(this.user.image);
    }
    onSubmit(){
        this._userService.updateUser(this.user).subscribe(
           
            response =>{
                this.userToEdit = response;
                
                if(!this.userToEdit.user){
                    this.status ='error';
                }else{
                    
                    localStorage.setItem('identity', JSON.stringify(this.userToEdit.user));
                    this.status ='success';

                    //Subir imagen
                    this._uploadService.makeFileRequest(this.url+'upload-Image-User/'+this.userToEdit.user._id,[],this.fileToUpload,this.token,'image')
                        .then((result:any)=>{
                            this.userToEdit.user.image =result.image;
                            localStorage.setItem('identity', JSON.stringify(this.userToEdit.user));
                            console.log(this.userToEdit.user);
                        });
                }
                
            },
            error =>{
                console.log('error');
                console.log(<any>error);
                /*
                var msjError =<any>error;
                if(msjError != null){
                    this.status= 'success';
                }*/
            }
        );
    }
    public fileToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.fileToUpload = <Array<File>>fileInput.target.files;
        console.log(this.fileToUpload);
    }
}