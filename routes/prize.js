const express = require('express');
const router = express.Router();
const prizeController = require('../controllers/prizeController');
router.get('/list/:id',prizeController.obtenerPremio);

module.exports = router;