var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('<h1>Hello your listed habits</h1>');
});

router.post('/', function(req, res, next) {
  // update post here
});

router.delete('/', function(req, res, next) {
  // update delete here
});

router.patch('/', function(req, res, next) {
  // update patch here
});

router.get('/tracker', function(req, res, next) {
  // update users tracker get logic here 
});

router.post('/tracker', function(req, res, next) {
  // update users tracker post logic here
});


module.exports = router;
