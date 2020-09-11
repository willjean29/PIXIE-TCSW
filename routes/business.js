const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const authController = require('../controllers/authController');
const {verificarToken} = require('../middlewares/authentication');
const {uploadImage} = require('../middlewares/uploadImage');


// crear empresa
router.get('/registrar',
  authController.adminsitradorAutenticado,
  businessController.mostrarRegistroEmpresa
);

// VALIDAR RUC
router.post('/verificar-ruc',
  // authController.adminsitradorAutenticado,
  businessController.validarRUC
);

// registar la empresa
router.post('/registrar',
  authController.adminsitradorAutenticado,
  businessController.registrarEmpresa
);

// agregar/actualizar avatar de la empresa
router.post('/avatar',
  authController.adminsitradorAutenticado,
  uploadImage,
  businessController.agregarAvatarEmpresa
);

// ver informacion de la empresa
router.get('/profile',
  authController.adminsitradorAutenticado,
  businessController.mostrarInformacionEmpresa
);

// modifcar datos adicionbales de la empresa
router.get('/modificar',
  authController.adminsitradorAutenticado,
  businessController.mostrarModificarEmpresa
);
router.put('/modificar',
  authController.adminsitradorAutenticado,
  businessController.modificarEmpresa
);

module.exports = router;