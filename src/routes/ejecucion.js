const express = require('express');
const router = express.Router();

const program_controller = require('../controller/programController');

router.get('/inicio', program_controller.inicio);
router.post('/traducir', program_controller.traducir);

module.exports = router;