//var express = require('express');
import express from 'express';
const router = express.Router();

/*AUTOR*/
router.get('/', function(req, res, next) {
  res.render('author',{ 
    author: 'FABIAN',
    lastname: 'MAGOS',
  
  });
});

export default router;
