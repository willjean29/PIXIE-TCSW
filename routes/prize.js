const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/prizeController');

router.get('/list/:id',prizeController.obtenerPremio);
router.put('/list/:id',prizeController.actualizarPremio);
router.delete('/list/:id',prizeController.eliminarPremio);

module.exports = router;