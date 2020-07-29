const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/registrer',categoryController.registrarCategoria);
router.get('/list',categoryController.obtenerCategorias);

module.exports = router;