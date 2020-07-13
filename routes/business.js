const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const {verificarToken} = require('../middlewares/authentication');

// crear empresa
router.get('/registrar',businessController.mostrarRegistroEmpresa);

router.post('/verificar-ruc',businessController.validarRUC);

router.post('/registrar',verificarToken,businessController.registrarEmpresa);

module.exports = router;