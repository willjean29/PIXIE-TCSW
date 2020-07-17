const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const {verificarToken} = require('../middlewares/authentication');
const {uploadImage} = require('../middlewares/uploadImage');


// crear empresa
router.get('/registrar',businessController.mostrarRegistroEmpresa);

router.post('/verificar-ruc',businessController.validarRUC);

router.post('/registrar',businessController.registrarEmpresa);

router.post('/avatar',uploadImage,businessController.agregarAvatarEmpresa);

router.get('/profile',businessController.mostrarInformacionEmpresa);

router.get('/modificar',businessController.mostrarModificarEmpresa);
router.put('/modificar',businessController.modificarEmpresa);

module.exports = router;