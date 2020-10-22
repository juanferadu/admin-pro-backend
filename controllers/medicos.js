const {response} = require('express');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico');
const {generarJWT} = require('../helpers/jwt');

const getMedicos = async(req, res) => {

    const medicos = await Medico.find()
                    .populate('hospital','nombre img')
                    .populate('usuario','nombre img');
    res.json({ //.status(400)
        ok: true,
        medicos
        //uid: req.uid
      });
  }

  const crearMedico = async(req, res = response) => {
    
    //console.log(req.body);
    const { nombre} = req.body;    
   
    try {

        const existeMedico = await Medico.findOne({nombre});

        if(existeMedico)
        {
        return res.status(400).json(
                {
                    ok: false,
                    msg:"El Médico ya está registrado"
                });
        }

        const uid = req.uid;
        const medico = new Medico({
            usuario: uid,
            ...req.body});
        
       
        //Guardar Hospital
        const MedicoDB = await medico.save();    
        
        res.json({ //.status(400)
            ok: true,
            hospital: MedicoDB           
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

//   const crearMedico = async(req, res = response) => {
    
//     res.json({ //.status(400)
//         ok: true,
//         msg:'crearMedico',
//     })
//   }


  const actualizarMedico = async(req, res = response) => {

    //TODO: Validar token y comprobar si es usuario correcto
    res.json({ //.status(400)
        ok: true,
        msg:'actualizarMedico',
    })
  }
  

  const borrarMedico = async(req, res = response) => {
    
    const uid = req.params.id;
   
    try {

        res.json({ //.status(400)
            ok: true,
            msg:'borrarMedico',
        })
        
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
      getMedicos,
      crearMedico,
      actualizarMedico,
      borrarMedico
  }