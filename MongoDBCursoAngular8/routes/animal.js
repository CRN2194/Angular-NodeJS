'use strict'
var express = require('express');
var animalController =require('../controllers/animal');
var multipart = require('connect-multiparty');
var api = express.Router();
var md_auth =require('../middlewares/authenticate');
var md_admin =require('../middlewares/is_admin');
var md_upload = multipart({uploadDir: './uploads/animals'});
api.get('/pruebas',md_auth.ensureAuth,animalController.pruebas);//Para proteger las rutas por autenticacion al logeo se coloca 2 parámetro
api.post('/animal',[md_auth.ensureAuth,md_admin.isAdmin],animalController.saveAnimal);//middleware para comprobar si es admin
api.get('/animals',animalController.getAnimals);
api.get('/animal/:id',animalController.getAnimal);
api.delete('/animal/:id',md_auth.ensureAuth,animalController.deleteAnimal);
api.put('/animals/:id',md_auth.ensureAuth,animalController.updateAnimal);
api.post('/upload-image-animal/:id',[md_auth.ensureAuth, md_upload],animalController.uploadImage);
api.get('/getimagefile-animal/:imageFile',animalController.getImageFile);
module.exports = api;