const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const {uploadImage} = require('../middlewares/uploadMultiImages');
router.get('/registrer',catalogController.mostrarCrearCatalogo);

router.post('/registrer',uploadImage,catalogController.registrarCatalogoPremios);

module.exports = router;