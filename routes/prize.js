const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const prizeController = require('../controllers/prizeController');

router.get('/list/:id',
  authController.adminsitradorAutenticado,  
  prizeController.obtenerPremio
);
router.put('/list/:id',
  authController.adminsitradorAutenticado,  
  prizeController.actualizarPremio
);
router.delete('/list/:id',
  authController.adminsitradorAutenticado,  
  prizeController.eliminarPremio
);

module.exports = router;