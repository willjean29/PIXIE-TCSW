const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

router.get('/list',clientController.mostrarClientesTotales);

module.exports = router;