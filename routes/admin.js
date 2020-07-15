const express = require('express');
const router = express.Router();
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');
const {verificarToken} = require('../middlewares/authentication');
 
router.get('/',administratorController.mostrarAdminArea);

router.get('/login',authController.mostrarLogin);
router.post('/login',authController.autenticarAdministrador);
router.post('/login2',authController.autenticarAdministrador2);
// agregar nuevo administrador 
router.get('/registrer',authController.mostrarRegistro);
router.post('/registrer',administratorController.agregarAdministrador);

// cerrando sesion
router.get('/cerrar-sesion',authController.cerrarSesion);

router.get('/token',authController.mostrarWebMaster);

router.post('/validarToken',authController.validarTokenAdmin);

router.get('/all',verificarToken,administratorController.obtenerAdministradores);

router.get('/administrator/:id',administratorController.obtenerAdministratorID);

router.get('/auth',verificarToken,administratorController.obtenerAdministradorActual);

router.get('/profile',administratorController.mostrarInformacionAdministrador);

module.exports = router;