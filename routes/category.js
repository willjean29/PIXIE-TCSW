const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

router.post('/registrer',
  // authController.adminsitradorAutenticado,
  categoryController.registrarCategoria
);
router.get('/list',
  authController.adminsitradorAutenticado,
  categoryController.obtenerCategorias
);

module.exports = router;