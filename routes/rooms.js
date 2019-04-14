var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/rooms');

/* GET users listing. */
router.get('/', ctrl.getRoom);
router.get('/:roomName', ctrl.getRoom);

module.exports = router;
