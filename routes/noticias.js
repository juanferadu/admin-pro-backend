/*
  ruta: /api/usuarios 
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt')

const {getNoticias,crearNoticia} = require('../controllers/noticias');

const router = Router();

router.get('/', getNoticias);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('descripcion','la descripcion es obligatoria').not().isEmpty(),
    validarCampos
],
crearNoticia);

//  router.put('/:id',
//   validarJWT,
//   [
//     check('nombre','El nombre es obligatorio').not().isEmpty(),  
//     check('email','El email es obligatorio').isEmail(),
//     check('role','El role es obligatorio').not().isEmpty(),  
//     validarCampos
//   ], 
//   actualizarUsuario);


// router.delete('/:id', 
//   validarJWT,
//   borrarUsuario);

module.exports = router;