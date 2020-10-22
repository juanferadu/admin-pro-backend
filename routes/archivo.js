/*
  ruta: /api/archivo 
 */

const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt')

const {leerArchivo} = require('../controllers/archivo');

const router = Router();

router.get('/', leerArchivo);

/*
router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos
],
 crearArchivo);

 router.put('/:id',
  validarJWT,
  [
    check('nombre','El nombre es obligatorio').not().isEmpty(),  
    check('email','El email es obligatorio').isEmail(),
    check('role','El role es obligatorio').not().isEmpty(),  
    validarCampos
  ], 
  actualizarArchivo);


router.delete('/:id', 
  validarJWT,
  borrarArchivo);*/

module.exports = router;