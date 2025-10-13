var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send('<h1>AlgoVisualizer Backend</h1> <br> <h3> Status: Running </h3>');
});

/* GET backend status. */
router.get('/status', function(req, res, next) {
  res.send('Hey, backend is running');
});

module.exports = router;
