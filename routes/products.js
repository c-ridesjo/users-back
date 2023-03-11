var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Ny version!');
});

router.get('/test', (req, res, next) => {   // next måste inte vara med, däremot reqest och response
  res.send('Ny version!');
});

module.exports = router;
