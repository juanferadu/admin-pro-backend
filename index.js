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
app.use('/api/login',require('./routes/auth')); 

app.listen(process.env.port, () => {
  console.log(`Example app listening at http://localhost:${process.env.port}`)
})