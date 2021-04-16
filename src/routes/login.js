const express = require('express');
const router = express.Router();

const program_controller = require('../controller/programController');

router.get('/login', program_controller.login);
router.post('/login', program_controller.inicioS);

module.exports = router;