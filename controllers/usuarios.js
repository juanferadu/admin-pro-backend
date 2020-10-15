const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');

const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({},'nombre email role google')
    res.json({ //.status(400)
        ok: true,
        usuarios,
        uid: req.uid
      })
  }

  const crearUsuario = async(req, res = response) => {
    
    //console.log(req.body);
    const { email, password, nombre} = req.body;    
   
    try {

        const existeMail = await Usuario.findOne({email});

        if(existeMail)
        {
        return res.status(400).json(
                {
                    ok: false,
                    msg:"El correo ya está registrado"
                });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //Guardar Usuario
        await usuario.save();

        //Crear Token
        const token = await generarJWT(usuario.id)
        
        res.json({ //.status(400)
            ok: true,
            usuario,
            token
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


  const actualizarUsuario = async(req, res = response) => {

    //TODO: Validar token y comprobar si es usuario correcto

    const uid = req.params.id;
    const { email, password, nombre} = req.body; 

    try {

        const usuarioDB = await Usuario.findById(uid);

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
             
                const existeEmail = await Usuario.findOne({email});
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

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true});
       

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

  const borrarUsuario = async(req, res = response) => {
    
    const uid = req.params.id;
    const { email, password, nombre} = req.body; 

    try {

        const usuarioDB = await Usuario.findById(uid);
     

         if(!usuarioDB)
            {
                return res.status(404).json(
                    {
                        ok: false,
                        msg:"No existe un usuario con ese Id"
                    }
                );
        
            }
        
        await Usuario.findByIdAndDelete(uid);

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
      getUsuarios,
      crearUsuario,
      actualizarUsuario,
      borrarUsuario
  }