require('dotenv').config();

const express = require('express')
const cors = require('cors')

const {dbConnection} = require('./database/config')

//Crear el servidor de express
const app = express()
//const port = 3000

//Configurar Cors
app.use(cors())

//Lectura y parseo del body
app.use(express.json());

//Base de Datos

dbConnection();

//User Cluster Mongo
//mean_user
//IozwfNYmiDXS3SQ0
// ip 201.246.119.69

//Variables de entorno de la aplicacion
//console.log(process.env);

//Rutas
app.use('/api/usuarios',require('./routes/usuarios')); 
app.use('/api/hospitales',require('./routes/hospitales')); 
app.use('/api/medicos',require('./routes/medicos')); 
app.use('/api/login',require('./routes/auth')); 
app.use('/api/todo',require('./routes/busquedas')); 
app.use('/api/upload',require('./routes/uploads')); 

//Lectura y escritura de archivos
app.use('/api/file',require('./routes/archivo')); 


//Obtener y crear noticias
app.use('/api/noticias',require('./routes/noticias')); 

app.listen(process.env.port, () => {
  console.log(`Example app listening at http://localhost:${process.env.port}`)
})