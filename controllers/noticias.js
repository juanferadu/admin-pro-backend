const {response} = require('express');
const bcrypt = require('bcryptjs');
const Noticia = require('../models/noticia');
const {generarJWT} = require('../helpers/jwt');

const getNoticias = async(req, res) => {

    const desde = Number(req.query.desde) || 0;
    //console.log(desde);

    const noticias = await Noticia.find({});
                                    // .skip(desde)
                                    // .limit(5);

    // const total = await Usuario.count();

    //Funciones asincronas 
    // const [noticias, total] =  await Promise.all([
    //     Noticia.find({},'nombre descripcion')
    //     .skip(desde)
    //     .limit(5),
    //     Noticia.countDocuments()
    // ]);

    res.json({ //.status(400)
        ok: true,
        noticias      
      })
  }

  const crearNoticia = async(req, res = response) => {
    
    //console.log(req.body);
    const { nombre, descripcion} = req.body;    
   
    try {

        const existeNoticia = await Noticia.findOne({nombre});

        if(existeNoticia)
        {
        return res.status(400).json(
                {
                    ok: false,
                    msg:"La noticia ya está registrada"
                });
        }

        const noticia = new Noticia(req.body);

        //Encriptar contraseña
        // const salt = bcrypt.genSaltSync();
        // usuario.password = bcrypt.hashSync(password,salt);

        //Guardar Usuario
        await noticia.save();

        //Crear Token
        //const token = await generarJWT(usuario.id)
        
        res.json({ //.status(400)
            ok: true,
            noticia
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


  module.exports = {
      getNoticias,
      crearNoticia      
  }