const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const authController = require('../controllers/authController');
const {verificarToken} = require('../middlewares/authentication');
const {uploadImage} = require('../middlewares/uploadImage');

// registrar un nuevo concurso
router.get('/simple/registrar',
  authController.adminsitradorAutenticado,
  competitionController.mostrarCrearConmcursoSimple
);
router.post('/simple/registrar',
  authController.adminsitradorAutenticado,
  competitionController.registrarConcurso
);

// ver perfil de la empresa
router.get('/simple/profile',
  authController.adminsitradorAutenticado,
  competitionController.mostrarConcursoSimple
);

// modifcar parametros de concursos
router.get('/simple/modificar',
  authController.adminsitradorAutenticado,
  competitionController.mostrarModificarConcursoSimple
);
router.put('/simple/modificar',
  authController.adminsitradorAutenticado,
  competitionController.modificarCompetition
);

// agregar/actualizar logo para el concurso
router.post('/simple/avatar',
  authController.adminsitradorAutenticado,
  uploadImage,
  competitionController.agregarAvatarCompetition
);

router.put('/simple/modificar/:id',
  // authController.adminsitradorAutenticado,
  competitionController.activarCompetition
);
module.exports = router;