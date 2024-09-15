const express = require('express');
const odbc = require('odbc');
const cors = require('cors');
const multer = require('multer');

const upload = multer();
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(upload.none());

async function connectToAccess() {
    try {
        return await odbc.connect(`DRIVER={Microsoft Access Driver (*.mdb, *.accdb)};DBQ=C:/Users/salva/OneDrive/Documentos/accessdb.accdb`);
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

app.post('/registro', async (req, res) => {
    const { nombre, apellido, correo, password, confirm_password } = req.body;

    // Escapar adecuadamente los valores para prevenir inyecciones SQL
    const escapeString = (str) => {
        return str.replace(/'/g, "''");
    };

    const escapedNombre = escapeString(nombre);
    const escapedApellido = escapeString(apellido);
    const escapedCorreo = escapeString(correo);
    const escapedPassword = escapeString(password);
    const escapedConfirmPassword = escapeString(confirm_password);

    try {
        const connect = await connectToAccess();

        const query = `INSERT INTO usuarios (nombre, apellido, correo, password, confirm_password) VALUES ('${escapedNombre}', '${escapedApellido}', '${escapedCorreo}', '${escapedPassword}', '${escapedConfirmPassword}')`;

        await connect.query(query);

        res.send('Usuario creado con éxito');

        await connect.close();
    } catch (error) {
        console.log(error);
        res.status(500).send('Usuario no creado :C ' + error);
    }
});

app.listen(port, () => {
    console.log(`app corriendo en el puerto http://localhost:${port}`);
});
