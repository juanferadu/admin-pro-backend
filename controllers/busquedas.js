const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const {generarJWT} = require('../helpers/jwt');

const getTodo = async(req, res) => {

    //TODO: rescatar parametro del apirest

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i')
    
    try {

        const [usuarios, medicos, hospitales] =  await Promise.all([
             Usuario.find({ nombre: regex}),
             Medico.find({ nombre: regex}),
             Hospital.find({ nombre: regex})            
        ]);
              
        res.json(
            {
                ok: true,
                usuarios,
                medicos,
                hospitales      
            });    
        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg:"Error inesperado ... revisar logs"
            }
        );
    }  
  }

  const getDocumentosColeccion = async(req, res) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda,'i');

    let data = [];    
    
    try {

        switch (tabla) {
            case 'medicos':
                data = await Medico.find({ nombre: regex})
                                .populate('usuario',' nombre img')
                                .populate('hospital',' nombre img');
                
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regex})
                                    .populate('usuario',' nombre img');
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regex});
                break;
            default:
                return res.status(400).json({
                        ok: false,
                        msg:"Error inesperado ... la tabla debe existir en la BD."
                    });                              
        }

        res.json({
            ok: false,
            resultados: data
        });    
        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg:"Error inesperado ... revisar logs"
            }
        );
    }  
  }
  

  module.exports = {
    getTodo,
    getDocumentosColeccion
  }