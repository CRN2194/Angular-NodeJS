'use strict'

var mongooose = require('mongoose');
var schema = mongooose.Schema;

var animalSchema = schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user:{type: schema.ObjectId, ref:'User'} // Sirve para indicar que es va a recibir desde un 3ro
});

module.exports = mongooose.model('Animal',animalSchema);