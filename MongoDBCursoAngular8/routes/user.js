'use strict'

var express = require('express');
var userController =require('../controllers/user');
var animalController =require('../controllers/animal');
var multipart = require('connect-multiparty');
var api = express.Router();
var md_auth =require('../middlewares/authenticate');
var md_upload = multipart({uploadDir: './uploads/users'});
api.get('/pruebas',md_auth.ensureAuth,userController.pruebas);//Para proteger las rutas por autenticacion al logeo se coloca 2 parámetro
api.post('/register',userController.saveRegister);
api.post('/login',userController.login);
api.get('/getimagefile/:imageFile',userController.getImageFile);
api.get('/getkeepers',userController.getKeepers);
api.post('/upload-image-user/:id',[md_auth.ensureAuth, md_upload],userController.uploadImage);//[] significa q le paso un array
api.put('/updateUser/:id',md_auth.ensureAuth,userController.updateUser); //put actualizar bd :id (id q se le transfiere)

module.exports = api;