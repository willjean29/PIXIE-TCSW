const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.get('/list',clientController.mostrarClientesTotales);
router.get('/activos',clientController.mostrarClientesActivos);
router.get('/inactivos',clientController.mostrarClientesInactivos);

module.exports = router;