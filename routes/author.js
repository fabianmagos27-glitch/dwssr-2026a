var express = require('express');
var router = express.Router();

/*AUTOR*/
router.get('/', function(req, res, next) {
  res.render('author',{ 
    author: 'FABIAN',
    lastname: 'MAGOS',
  
  });
});

module.exports = router;
