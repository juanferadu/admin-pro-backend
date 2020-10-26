const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require('fs');


const borrarImagen = (path)=>{

            if(fs.existsSync(path))
            {
                //Borrar la imagen anterior
                fs.unlinkSync(path); 
            }

}

const actualizarImagen = async (tipo, id, nombreArchivo) => {

    let pathViejo = '';
   
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);  
            if(!medico)
            {
                console.log('No es un médico por Id');
                return false;
            }    
            
            pathViejo = './uploads/medicos/'+medico.img;

            borrarImagen(pathViejo);

            medico.img = nombreArchivo;
            await medico.save();

            return true;

            break;
        case 'hospitales':
            const hospital = await Hospital.findById(id);     
            if(!hospital)
            {
                console.log('No es un Hospital por Id');
                return false;
            }    
            
            pathViejo = './uploads/hospitales/'+hospital.img;

            borrarImagen(pathViejo);
           
            hospital.img = nombreArchivo;
            await hospital.save();  
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);  
           
            if(!usuario)
            {
                console.log('No es un usuario por Id');
                return false;
            }    
            
            pathViejo = './uploads/usuarios/'+usuario.img;

            borrarImagen(pathViejo);
           
            usuario.img = nombreArchivo;
            await usuario.save();  
            break;
        default:
            return res.status(400).json({
                    ok: false,
                    msg:"Error inesperado ... la tabla debe existir en la BD."
                });                              
    }


}

module.exports = {

    actualizarImagen
}