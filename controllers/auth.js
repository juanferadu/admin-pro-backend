
const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');
const { googleVerify} = require('../helpers/google-verify');


const login = async(req, res = response) => {
    
    const uid = req.params.id;
    const { email, password } = req.body; 

    try {

       //Verificar Email
       const usuarioDB = await Usuario.findOne({email});    
         if(!usuarioDB)
            {
                return res.status(404).json(
                    {
                        ok: false,
                        msg:"email no encontrado!"
                    }
                );
        
            }
        //Verificar contraseña
        const validaPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!usuarioDB)
           {
               return res.status(400).json(
                   {
                       ok: false,
                       msg:"contraseña no válida!"
                   }
               );
       
           }

        //generar TOKEN - JWT

        const token = await generarJWT(usuarioDB.id)

        res.json(
            {
                ok: true,
                token            
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


  const googleSignIn = async(req, res = response) => {
    
    try {

      const googleToken = req.body.token;

      const {name, email, picture} = await googleVerify(googleToken);  

      //Verificar si existe usuario con ese correo
      const usuarioDB = await Usuario.findOne({email});
      let usuario;

        if(!usuarioDB)
        {
            //Sino existe el usuario
            usuario = new Usuario({
                nombre: name,
                email,
                password: "@@@",
                img: picture,
                google: true

            });
            console.log('usuario no existe');
        }
        else
        {
            usuario = usuarioDB;
            usuario.google = true;
            //usuario.img = picture;
            //usuario.password = "@@@";
            console.log('usuario existe');
        }

        //Guardar en DB
        await usuario.save();

        //generar TOKEN - JWT
        const token = await generarJWT(usuario.id)

        res.json(
            {
                ok: true,
                token         
            });    
        
    } catch (error) {
        console.log(error);
        res.status(401).json(
            {
                ok: false,
                msg:"Token no es correcto"
            }
        );
    }

  }

  module.exports = {
      login,
      googleSignIn
  }