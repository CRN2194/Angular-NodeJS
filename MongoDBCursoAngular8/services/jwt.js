'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');//generrar time span
var secret = 'clave';//crear el token
exports.createToken = function(user){//usuario q se intenta logear
    var payload ={
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(), //timespan actual
        exp: moment().add(30,'days').unix 
    };

    return jwt.encode(payload,secret);
};