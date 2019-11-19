'use strict'

//Modulos
var User = require('../models/user');
var Animal= require('../models/animal');
var fs =require('fs');
var path =require('path');


function pruebas(req, res){
    res.status(200).send({
        message: 'Probando el controlador animales'
    });
}
function saveAnimal(req,res){
    //Guardar un nuevo animal
    var animal = new Animal();
    var params =req.body;
    
    //dato obligatorio; nombre
    if(params.name){
        animal.name =params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image =params.image;
        animal.user = req.user.sub; //usuario logeado

        animal.save((err,animalStore)=>{
            if(err){
                res.status(500).send({
                    message: 'Error en el servidor'
                });  
            }else{
                if(!animalStore){
                    res.status(404).send({
                        message: 'No se ha guardado el animal'
                    });
                }else{
                    res.status(200).send({animal:animalStore});
                }    
            }
        });//mongosse
    }else{
        res.status(200).send({
            message: 'El nombrel del animal es obligatorio'
        });
    }
    
  
}
function getAnimals(req,res){
    Animal.find({}).populate({path:'user'}).exec((err,animals)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if(!animals){
                res.status(404).send({
                    message: 'No existen animales'
                });
            }else{
                res.status(200).send({ animals
                });
            }
        }
    });  //Coje el id del usuario asignado al animal ;user por medio de populate
}
function getAnimal(req,res){
    var animalId= req.params.id;
    Animal.findById(animalId).populate({path:'user'}).exec((err,animal)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if(!animal){
                res.status(404).send({
                    message: 'El animal no existen '
                });
            }else{
                res.status(200).send({ animal
                });
            }
        }
    });
}
function updateAnimal(req,res){
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId,update,{new:true},(err,animalUpdate)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });
        }else{
            if(!animalUpdate){
                res.status(404).send({
                    message: 'Animal no actualizado '
                });
            }else{
                res.status(200).send({ animalUpdate
                });
            }
        }
    });//Se pasa el id y el objeto animal con sus propiedades q trae desde url
}
function deleteAnimal(req,res){
    var animalId= req.params.id;
    Animal.findByIdAndDelete(animalId,(err,animalRemove)=>{
        if(err){
            res.status(500).send({
                message: 'Error en la petición'
            });  
        }else{
            if(!animalRemove){
                res.status(404).send({
                    message: 'No se a podido borrar el animal'
                });
            }else{
                res.status(200).send({animalRemove
                });
            }
        }
    });
}
function uploadImage(req,res){
    var animalId = req.params.id;
    var file_name = 'No subido';
    if(req.files){
        var file_path = req.files.image.path;
        var file_split =file_path.split('\\')// saca el nombre dle fichero
        var file_name =file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];
        
        if (file_ext =='png' || file_ext =='jpeg' || file_ext =='gif' || file_ext =='jpg') {
            
            Animal.findByIdAndUpdate(animalId,{image: file_name},{new:true},(err,animalUpdate)=>{
               if(err){
                   res.status(500).send({
                       message: 'Error al actualizar el animal'
                   });
               }else{
                   if(!animalUpdate){
                       res.status(404).send({
                           message: 'No es posible actualizar el animal'
                       });
                   }  else{
                       res.status(200).send({animal: animalUpdate, image: file_name});
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
       var path_file = './uploads/animals/'+imageFile;
       console.log(path_file);
       fs.exists(path_file,function(exists){
           if(exists){
               res.sendFile(path.resolve(path_file));
           }else{
               res.status(404).send({message: 'La imagen no existe'});
           }
       });
   
   }
module.exports ={
    pruebas,
    saveAnimal,
    getAnimals,
    getAnimal,
    updateAnimal,
    deleteAnimal,
    uploadImage,
    getImageFile
}