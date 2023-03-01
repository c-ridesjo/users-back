var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Prod router!');
});

router.get('/test', function(req, res, next){   // next måste inte vara med, däremot reqest och response
  res.send('test prod router');
});

module.exports = router;
