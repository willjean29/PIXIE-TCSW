const express = require('express');
const clientController = require('../controllers/clientController');
const authController = require('../controllers/authController');
const router = express.Router();

router.get('/list',
  authController.adminsitradorAutenticado,
  clientController.mostrarClientesTotales
);
router.get('/activos',
  authController.adminsitradorAutenticado,
  clientController.mostrarClientesActivos
);
router.get('/inactivos',
  authController.adminsitradorAutenticado,
  clientController.mostrarClientesInactivos
);

module.exports = router;