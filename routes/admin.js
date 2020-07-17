const express = require('express');
const router = express.Router();
const administratorController = require('../controllers/administratorController');
const authController = require('../controllers/authController');
const {verificarToken} = require('../middlewares/authentication');
const {uploadImage} = require('../middlewares/uploadImage');

// panel principal de administrador
router.get('/',
  authController.adminsitradorAutenticado,
  administratorController.mostrarAdminArea
);

// validar el dni del adminsitradorAutenticado
router.post('/verificar-dni',authController.verificarDNI);

// iniciar sesión
router.get('/login',authController.mostrarLogin);
router.post('/login',authController.autenticarAdministrador);

router.post('/login2',authController.autenticarAdministrador2);

// agregar nuevo administrador 
router.get('/registrer',authController.mostrarRegistro);
router.post('/registrer',administratorController.agregarAdministrador);

// cerrando sesion
router.get('/cerrar-sesion',
  authController.adminsitradorAutenticado,
  authController.cerrarSesion
);

// validar token de web master
router.get('/token',authController.mostrarWebMaster);
router.post('/validarToken',authController.validarTokenAdmin);

router.get('/all',administratorController.obtenerAdministradores);
router.get('/administrator/:id',administratorController.obtenerAdministratorID);
router.get('/auth',administratorController.obtenerAdministradorActual);

// mostrar informacion de administrador
router.get('/profile',
  authController.adminsitradorAutenticado,
  administratorController.mostrarInformacionAdministrador
);

// modifcar informacion de administrador
router.put('/modificar',
  authController.adminsitradorAutenticado,
  administratorController.modificarAdministrador
);

// agregar/actualizar avatar de administrador
router.post('/avatar',
  authController.adminsitradorAutenticado,
  uploadImage,
  administratorController.agregarAvatarAdministrador
);

module.exports = router;