var express = require('express');
var router = express.Router();
var ctrl = require('../controllers/campaigns');

/* GET users listing. */
router.get('/', ctrl.get);
router.get('/:campaignId', ctrl.getOne);

module.exports = router;
