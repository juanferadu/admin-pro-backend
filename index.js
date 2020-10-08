require('dotenv').config();

const express = require('express')
const cors = require('cors')

const {dbConnection} = require('./database/config')

//Crear el servidor de express
const app = express()
//const port = 3000

//Configurar Cors
app.use(cors())

//Base de Datos

dbConnection();

//User Cluster Mongo
//mean_user
//IozwfNYmiDXS3SQ0
// ip 201.246.119.69

console.log(process.env);

app.get('/', (req, res) => {
  res.status(400).json({
      ok: true,
      msg: "Hola Mundo!"
  });   
})

app.listen(process.env.port, () => {
  console.log(`Example app listening at http://localhost:${process.env.port}`)
})