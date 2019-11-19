'use strict'
//conexion a la bd con mongoose
// cambiamos 'var' por 'const', Node soporta let y const (ES2015) desde la versión 6.4.0
const mongoose = require('mongoose');
const app = require('./app');
const port = 3700;

mongoose.Promise = global.Promise;
// A continuación creamos el objeto de opciones que pasaremos a la conexión
// 'useNewUrlParser' se establece a 'true' y esto elimina la advertencia.

mongoose.connect('mongodb://localhost:27017/zoo', {useNewUrlParser: true,useUnifiedTopology: true }) // <= aqui pasamos las opciones que creamos anteriormente
    .then(()=>{
        console.log("Conexión a BD exitosa! :)")
        app.listen(port,function() {
            console.log('servidor iniciado correctamente en la url localhost:3700');
        });
        //creación del servidor
    })
    .catch(err => {
        console.log(err);
        process.exit(1); // <= cerramos el proceso con un 'exit code' distinto de cero
    });