const express = require('express');
const router = express.Router();

const program_controller = require('../controller/programController');

router.get('/login', program_controller.login);
router.post('/login', program_controller.inicioS);
router.get('/registro', program_controller.registro);
router.post('/registro', program_controller.registroS);

module.exports = router;