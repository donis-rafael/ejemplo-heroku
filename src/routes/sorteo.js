const express = require('express');
const router = express.Router();

const program_controller = require('../controller/programController');

router.get('/sorteo', program_controller.sorteo);
router.get('/resultado', program_controller.resultado);
//router.get('/harrypotter/disimula/fito', program_controller.fito);

module.exports = router;