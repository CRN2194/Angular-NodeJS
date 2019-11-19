'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave';
exports.ensureAuth = function(req,res,next){
   //middleware se ejecuta antes de la funcion o metodo 
   if(!req.headers.authorization){
        return res.status(403).send({message:'cabezera de autenticacion'});
   }
   var token = req.headers.authorization.replace(/['"]+/g, '');
   try {
       var payload = jwt.decode(token,secret);
       if(payload.sub && (payload.exp <=moment.unix())){
           return res.status(401).send({message: 'El token ha expirado'});
       }
   } catch (error) {
       return res.status(404).send({message: 'El token no es válido'});
   }

   req.user = payload;
   next();
}