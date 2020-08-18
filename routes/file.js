const express = require('express');
const fileController = require('../controllers/fileController');
const {uploadCSV} = require('../middlewares/uploadFileCSV');

const router = express.Router();

router.post('/upload',
  uploadCSV,
  fileController.registrarArchivo
);

router.get('/ventas/:id',fileController.obtenerDatosArchivo);
router.get('/clientes/:id',fileController.cargarDataCliente);

module.exports = router;