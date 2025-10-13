var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user profile - Protected route example */
router.get('/profile', authenticateToken, function(req, res, next) {
  res.json({
    success: true,
    message: 'Profile accessed successfully',
    user: req.user
  });
});

module.exports = router;
