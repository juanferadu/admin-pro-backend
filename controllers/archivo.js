const {response} = require('express');
const bcrypt = require('bcryptjs');
const Archivo = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');
const fs = require('fs');
const readline = require('readline');

const leerArchivo = async(req, res) => {

    const host = [{
        name: String,
        turnos: Number
    }];

    let contador = 0;

    const rl = readline.createInterface({
        input: fs.createReadStream('C:/turnos_semanales.txt')
    });
    
    // Each new line emits an event - every time the stream receives \r, \n, or \r\n
    rl.on('line', (line) => {        
        var res = line.split(" ");
        //console.log(res);        
        host.push({ 'name':res[0], 'turnos':res[1] });

        
        contador =+1;
    });


    //Recorrer resultado
    // let greaterTen = [];
    // for (let i = 0; i<host.length; i++) {
    //   var nameHost = host[i].name;
    //   if (nameHost !=="") {
    //       console.log(nameHost);
    //         greaterTen.push(currentNumber);
    //   }
    // }
    
    // host.forEach(function(nombres, index) {
    //     console.log(`${index} : ${nombres.name, nombres.turnos}`);
    // });

    host.forEach(function(value) {
        console.log(value[name], value[turnos]);
      });

    //  let items = host.filter(function(item){
    //     return (item.id % 2 == 0);
    //   });
    //   console.log(items);

    // console.log(host);
    // for (let item of host){
    //     // if (cad!=="") cad += ", ";
    //     // cad += item;
    //     console.log('name:'+item.name+' horas:'+item.turnos);
    //   }
            
    //for(var i = 0;i < host.length; i++){
      
        // if(host[i].name == res[0])
        // {
        //    let total =  host[i].turnos =+ res[1];
        //    host[i].push({ turnos:total });
        // }
        // else{
        //     host.push({ name:res[0], turnos:res[1] });
        // }
    //}

    // Write a string to another file and set the file mode to 0755
    // for(var i = 0;i < host.length; i++){
    //     fs.writeFile('C:/consolidado.txt', host['name'], function(err) {
    //     // If an error occurred, show it and return
    //     if(err) return console.error(err);
    //     // Successfully wrote to the file!
    //   });
    // }
  
    
    rl.on('close', () => {
        console.log('Done reading file');
        res.json({ //.status(400)
                        ok: true,
                        host
                      })
    });


    // fs.readFile('C:/turnos_semanales.txt', 'utf-8', (err, data) => {
    //     if(err) {
    //       console.log('error: ', err);
    //       return res.status(400).json(
    //         {
    //             ok: false,
    //             msg:"El archivo no puede ser leído"
    //         });
    //     } else {
    //       console.log(data);
    //       res.json({ //.status(400)
    //             ok: true,
    //             data
    //           })
    //     }
    //   });

    // const usuarios = await Archivo.find({},'nombre email role google')
    // res.json({ //.status(400)
    //     ok: true,
    //     usuarios,
    //     uid: req.uid
    //   })
  }

 /* const crearArchivo = async(req, res = response) => {
    
    //console.log(req.body);
    const { email, password, nombre} = req.body;    
   
    try {

        const existeMail = await Archivo.findOne({email});

        if(existeMail)
        {
        return res.status(400).json(
                {
                    ok: false,
                    msg:"El correo ya está registrado"
                });
        }

        const usuario = new Archivo(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt);

        //Guardar Archivo
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


  const actualizarArchivo = async(req, res = response) => {

    //TODO: Validar token y comprobar si es usuario correcto

    const uid = req.params.id;
    const { email, password, nombre} = req.body; 

    try {

        const usuarioDB = await Archivo.findById(uid);

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
             
                const existeEmail = await Archivo.findOne({email});
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

        const usuarioActualizado = await Archivo.findByIdAndUpdate(uid, campos, {new: true});
       

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

  const borrarArchivo = async(req, res = response) => {
    
    const uid = req.params.id;
    const { email, password, nombre} = req.body; 

    try {

        const usuarioDB = await Archivo.findById(uid);
     

         if(!usuarioDB)
            {
                return res.status(404).json(
                    {
                        ok: false,
                        msg:"No existe un usuario con ese Id"
                    }
                );
        
            }
        
        await Archivo.findByIdAndDelete(uid);

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

  }*/

  module.exports = {
      leerArchivo,
      //crearArchivo,
      //actualizarArchivo,
      //borrarArchivo
  }