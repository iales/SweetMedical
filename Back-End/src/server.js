require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');


const port = process.env.PORT 
const host = process.env.HOST 
const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error de conexión:', err));

app.listen(port, host, () => 
    {console.log(`Servidor corriendo en http://${host}:${port}`)}
);


