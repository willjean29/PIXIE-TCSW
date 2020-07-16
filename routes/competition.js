const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const {verificarToken} = require('../middlewares/authentication');
const {uploadImage} = require('../middlewares/uploadImage');


router.get('/simple/registrar',competitionController.mostrarCrearConmcursoSimple);
router.post('/simple/registrar',competitionController.registrarConcurso);

router.get('/simple/profile',competitionController.mostrarConcursoSimple);

router.get('/simple/modifcar',competitionController.mostrarModificarConcursoSimple);

router.post('/simple/avatar',uploadImage,competitionController.agregarAvatarCompetition);

module.exports = router;