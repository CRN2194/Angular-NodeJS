/* Creacion del servidor*/
'use strict'
const express = require('express');
const app = express();
//const bodyParser =require('body-Parser');
//Cargar rutas
const user_routes = require('./routes/user');
const animal_routes = require('./routes/animal');
//middleware(ejecuta lo primero http)
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Configurar cabezera y core
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY,Origin, X-Request-with, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.get('/test', function (req,res){
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send('Hola mundo desde mi API REST en NodeJS');
    });
//Rutas y bases
app.use('/api',user_routes);
app.use('/api',animal_routes);
//Exportar modulos

module.exports = app;