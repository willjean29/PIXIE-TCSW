const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const {verificarToken} = require('../middlewares/authentication');

router.get('/registrar',competitionController.mostrarCrearConmcursoSimple);

router.post('/registrar',verificarToken,competitionController.registrarConcurso);

module.exports = router;