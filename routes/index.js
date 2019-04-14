var express = require('express');
var router = express.Router();
var roomsRouter = require('./rooms');
var campaignsRouter = require('./campaigns');

router.use('/rooms', roomsRouter);
router.use('/campaigns', campaignsRouter);

/* GET home page. */
router.use('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
