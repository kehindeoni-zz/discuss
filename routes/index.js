var express = require('express');
var router = express.Router();
var usersRouter = require('./users');
var campaignsRouter = require('./campaigns');

router.use('/users', usersRouter);
router.use('/campaigns', campaignsRouter);

/* GET home page. */
router.use('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
