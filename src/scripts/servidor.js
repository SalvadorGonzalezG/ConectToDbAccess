// Creando nuestro servidor con expressJs
const express = require('express');
const odbc = require('odbc');
const cors = require('cors');
const multer = require('multer');

const upload =multer()
// Creando nuestra instancia de express el cual correra en el puerto 3000.
const app = express()
const port = 3000;

async function connectToAccess (){
    return await odbc.connect(`
        DRIVER={ Microsoft Access Driver (*.mdb, *.accdb)}; BDQ=C://Ruta_de_mi_db.accdb
        `)
}

    // Ruta de tipo post para el registro de un usuario
app.post('/registro', async(req, res)=>{
    //Extraemos los datos del cuarpo de la solicitud
    const {nombre, apellido, correo, password, confirm_password} = req.body

    try {
        // Establecemos contacto con la base de datos de Access utilizando una funcion asyncrona (connectToAccess())
        const connect = await connectToAccess()

        // Crearemo un query para poder insertar estos datos en mi db
        const query = `INSERT INTO usuarios (nombre, apellido, , password, confirm_password)
        VALUES ('${nombre}','${apellido}','${correo}','${password}','${confirm_password}')`
    
        //Ejecutamos la consulta a la base de datos
        await connect.query(query)

        // si la consulta sale bien enviamos una respuesta indicando que el usuario fue creado con exito
        res.send(`Usuario creado con Exito `)

        // Cerramos la conexion con la base de datos
        await connect.close()
    } catch (error) {

        // Si ocrru un error enviamos un 500 indicando que el usuario no a sido creado
        res.status(500).send('Usuario No creado :C '+ error)
    }    
})

 
// Iniciando el servidor, funcion de callback que se ejecutara una vez que el servidor este corriendo
app.listen(port, ()=>{
    console.log(`app corriendo en el puerto http://localHost:${port}`)
})