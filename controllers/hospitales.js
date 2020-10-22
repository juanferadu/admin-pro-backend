const {response} = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');
const {generarJWT} = require('../helpers/jwt');

const getHospitales = async(req, res) => {

    const hospitales = await Hospital.find()
                        .populate('usuario','nombre');
    res.json({ //.status(400)
        ok: true,
        hospitales,
        uid: req.uid
      })
  }

  const crearHospital = async(req, res = response) => {
    
    //console.log(req.body);
    const { nombre} = req.body;    
   
    try {

        const existeHospital = await Hospital.findOne({nombre});

        if(existeHospital)
        {
        return res.status(400).json(
                {
                    ok: false,
                    msg:"El Hospital ya está registrado"
                });
        }

        const uid = req.uid;
        const hospital = new Hospital({
            usuario: uid,
            ...req.body});
        
       
        //Guardar Hospital
        const hospitalDB = await hospital.save();    
        
        res.json({ //.status(400)
            ok: true,
            hospital: hospitalDB           
            })
        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg:"Error inesperado ... revisar logs"
            }
        )
    } 
  }


  const actualizarHospital = async(req, res = response) => {

    //TODO: Validar token y comprobar si es usuario correcto

    const uid = req.params.id;
    const { email, password, nombre} = req.body; 

    try {

        const usuarioDB = await Hospital.findById(uid);

            if(!usuarioDB)
            {
                return res.status(404).json(
                    {
                        ok: false,
                        msg:"No existe un usuario con ese Id"
                    }
                );
        
            }

            //Actualizaciones
             const {password, google, email, ...campos} = req.body; 

             if(usuarioDB.email != email)
             {
             
                const existeEmail = await Hospital.findOne({email});
                if(existeEmail)
                {
                    return  res.status(400).json(
                        {
                            ok: false,
                            msg:"Ya existe un usuario con ese mail"
                        }
                    );
                }
             }
             campos.email = email;
             //delete campos.password;
             //delete campos.google;

        const usuarioActualizado = await Hospital.findByIdAndUpdate(uid, campos, {new: true});
       

         res.json(
            {
                ok: true,
                usuario: usuarioActualizado                
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

  const borrarHospital = async(req, res = response) => {
    
    const uid = req.params.id;
    const { email, password, nombre} = req.body; 

    try {

        const usuarioDB = await Hospital.findById(uid);
     

         if(!usuarioDB)
            {
                return res.status(404).json(
                    {
                        ok: false,
                        msg:"No existe un usuario con ese Id"
                    }
                );
        
            }
        
        await Hospital.findByIdAndDelete(uid);

        res.json(
            {
                ok: true,
                msg:'usuario eliminado'                
            });    
        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
                ok: false,
                msg:"Hable con el Administrador"
            }
        );
    }

  }

  module.exports = {
      getHospitales,
      crearHospital,
      actualizarHospital,
      borrarHospital
  }