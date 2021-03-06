/*
  path: /api/login
 */
const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos')

const router = Router();

const {login, googleSignIn} = require('../controllers/auth');



router.post('/',[
    check('password','El password es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    validarCampos   
 ],
 login);


 router.post('/google',[
  check('token','El token de Googles es obligatorio').not().isEmpty(),
  validarCampos   
],
googleSignIn);



module.exports = router;