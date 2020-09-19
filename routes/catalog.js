const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const authController = require('../controllers/authController');
const {uploadImage} = require('../middlewares/uploadMultiImages');
router.get('/registrer',
  authController.adminsitradorAutenticado,
  catalogController.mostrarCrearCatalogo
);

router.post('/registrer',
  authController.adminsitradorAutenticado,
  uploadImage,
  catalogController.registrarCatalogoPremios
);

router.get('/list',
  authController.adminsitradorAutenticado,
  catalogController.mostrarListaCatalogo
);

module.exports = router;