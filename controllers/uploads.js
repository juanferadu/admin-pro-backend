const {response} = require('express');
const {actualizarImagen} = require('../helpers/actualizar-imagen');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const fileUpload = async(req, res = response) => {

    //TODO: rescatar parametro del apirest

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar que exista un tipo archivo válido
    const tiposValidos = ['medicos','hospitales','usuarios'];
    if(!tiposValidos.includes(tipo)){
        return res.status(400).json(
            {
                ok: false,
                msg:"El tipo de archivo no existe"
            }
        );
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return  res.status(400).json(
            {
                ok: false,
                msg:"No hay ningun archivo"
            }
        );
      }
   
    
    try {

        //Procesar imagen
        const file = req.files.imagen; //nombre dado en Body/key de postman
        //console.log(file);

        const nombreCortado = file.name.split('.'); //nombre dividido en array 
        const extensionArchivo= nombreCortado[nombreCortado.length-1];

        //Validar Extension
        const extensionesValidas = ['jpg','png','jpeg','git']
        if(!extensionesValidas.includes(extensionArchivo)){
            return res.status(400).json(
                {
                    ok: false,
                    msg:"El tipo de extension no es válida"
                }
            );
        }

        //Generar el nombre del archivo

        const nombreArchivo =  uuidv4()+'.'+extensionArchivo;

        //Path para guardar la imagen
        const path = './uploads/'+tipo+'/'+nombreArchivo;

        file.mv(path, err=> {
            if (err)
            {
                return res.status(500).json(
                    {
                        ok: false,
                        msg:"No tiene permisos para guardar en este directorio"
                    });
            }

            //Actualizar BD.
            actualizarImagen(tipo, id, nombreArchivo);
            
            res.json(
                {
                    ok: true,
                    msg:'Archivo Subido!',
                    nombreArchivo
                });                      
          });                                  
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg:"Error inesperado ... revisar logs"
            });
    }  
  }

  const retornaImagen = async(req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,'../uploads/'+tipo+'/'+foto);

    //Validar que exista imagen
    if(fs.existsSync(pathImg))
    {
        res.sendFile(pathImg);
    }
    else
    {
        const pathImg = path.join(__dirname,'../uploads/no-image.png');
        res.sendFile(pathImg);
    }

   

  }
 

  module.exports = {
    fileUpload,
    retornaImagen
  }