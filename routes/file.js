const express = require('express');
const fileController = require('../controllers/fileController');
const {uploadCSV} = require('../middlewares/uploadFileCSV');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/upload',
  authController.adminsitradorAutenticado,
  uploadCSV,
  fileController.registrarArchivo
);

router.get('/ventas/:id',
  authController.adminsitradorAutenticado,
  fileController.obtenerDatosArchivo
);
router.get('/clientes/:id',
  authController.adminsitradorAutenticado,
  fileController.cargarDataCliente
);
router.delete('/:id',
  authController.adminsitradorAutenticado,
  fileController.eliminarArchivo
);

module.exports = router;