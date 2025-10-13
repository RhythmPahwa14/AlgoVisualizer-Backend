var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET backend status. */
router.get('/status', function(req, res, next) {
  res.send('Hey, backend is running');
});

module.exports = router;
