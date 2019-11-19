'use strict'
// Librerias
var bcrypt = require('bcrypt-nodejs');
//Modulos
var User = require('../models/user');
var fs =require('fs');
var path =require('path');
//importar jwt 
var jwt = require('../services/jwt');

function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador usuario'
    });
}


function saveRegister(req, res){
    //Se llama a la clase
    var user = new User();
    var params = req.body;
  
    
    if (params.password && params.surname && params.surname && params.email) {
        //Asignar valores al objeto usuario
        user.name  = params.name;
        user.surname  = params.surname;
        user.email  = params.email;
        user.rol  = 'ROLE_USER';
        user.image  = null;

        //Ver si el usuario ya se encuentra repetido A traves del email
        User.findOne({email:user.email.toLowerCase()},(err,issetUser)=>{
            if(err){
                res.status(500).send({message: 'Error al comprobar el usuario'})
            }else{
                if(!issetUser){
                    //Cifrado de contraseña
                    bcrypt.hash(params.password,null,null,function(err,hash){
                        user.password =hash;
                        //Guardado de contraseña
                        user.save((err, userstore)=>{
                            if(err){
                                res.status(500).send({message: 'Error al guardar el usuario'})
                            }else{
                                if(!userstore){
                                    res.status(404).send({message: 'Error al registrar el usuario'})
                                }else{
                                    res.status(200).send({user: userstore})
                                }
                            }
                        });
                    });

                }else{
                    res.status(200).send({message: 'El usuario no puede registrarse'});
                }
            }

        });
            
    }else{
        res.status(200).send({
            message: 'Introducte los datos correctamente'
        });
    
    }
        
    }
   
function login(req,res){
    
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({email:email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message: 'Error al comprobar el usuario'})
        }else{
            if(user){
                
                bcrypt.compare(password,user.password,(err,check)=>{
                    if(check){
                        if(params.gettoken){
                            res.status(200).send({token: jwt.createToken(user)});
                        }else{
                            res.status(200).send({user});
                        }

                    }else{
                        res.status(404).send({
                            message: 'Registro de usuario fallo'
                        });
                    }
                });
            }else{
                res.status(404).send({
                    message: 'Registro de usuario fallo'
                });
            }
            }
        });


}
function updateUser(req,res){

    var userId= req.params.id; //params que llegan por la url
    var update = req.body;
    delete update.password;
    if(userId != req.user.sub){ //Comprobacion si el usuario logeado es igual al actual
        return res.status(500).send({message: 'No tiene permiso para actualizar el usuario'});
    }
   
    User.findByIdAndUpdate(userId,update,{new:true},(err,userUpdate)=>{
        if(err){
            res.status(500).send({
                message: 'Error al actualizar el usuario'
            });
        }else{
            if(!userUpdate){
                res.status(404).send({
                    message: 'No es posible actualizar el usuario'
                });
            }  else{
                res.status(200).send({user: userUpdate});
            }    
        }

    });
 
}
function uploadImage(req,res){
 var userId = req.params.id;
 var file_name = 'No subido';
 if(req.files){
     var file_path = req.files.image.path;
     var file_split =file_path.split('\\')// saca el nombre dle fichero
     var file_name =file_split[2];
     var ext_split = file_name.split('\.');
     var file_ext = ext_split[1];
     
     if (file_ext =='png' || file_ext =='jpeg' || file_ext =='gif' || file_ext =='jpg') {
         if (userId != req.user.sub) {
            return res.status(500).send({message: 'No tienes permiso para actualizar la imagen'}); 
         }  
         User.findByIdAndUpdate(userId,{image: file_name},{new:true},(err,userUpdate)=>{
            if(err){
                res.status(500).send({
                    message: 'Error al actualizar el usuario'
                });
            }else{
                if(!userUpdate){
                    res.status(404).send({
                        message: 'No es posible actualizar el usuario'
                    });
                }  else{
                    res.status(200).send({user: userUpdate, image: file_name});
                }    
            }
    
        });   
     }else{
        //bORRAR un archivo
        fs.unlink(file_path, ()=>{
            res.status(200).send({message:'Extensión invalida'});
        });
     }

     

     
 }
}

function getImageFile(req,res){
    var imageFile = req.params.imageFile; //datos que vienen desede la url
    var path_file = './uploads/users/'+imageFile;
    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(404).send({message: 'La imagen no existe'});
        }
    });

}
function getKeepers(req,res){
    User.find({role:'ROLE_ADMIN'}).exec((err,users)=>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        }else{
            if(!users){
                res.status(404).send({message: 'No hay cuidadores'});
            }else{
                res.status(200).send({users});
            }
        }
    });
}

module.exports ={
    pruebas,
    saveRegister,
    login,
    updateUser,
    uploadImage,
    getImageFile,
    getKeepers
};