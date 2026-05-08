//var express = require('express');
import express from 'express';
const router = express.Router();
//import Logger
import logger from '../lib/winston.js';

/* GET home page. *///eslint-disable-next-line no-unused-vars
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Proyecto Asombroso✨'});
});

//Rutas para pruebas de logs
router.get("/test-logs",(req, res)=>{
  //Generar logs
  logger.error("Esto es una prueba del log tipo error")
  logger.warn("Esto es una prueba del log tipo warn")
  logger.info("Esto es una prueba del log tipo infp")
  logger.http("Esto es una prueba del log tipo http")
  logger.debug("Esto es una prueba del log tipo debug")

  //Estructurado respuestas
  res.json({
    message:"Se crearon logs de prueba",
    archivos:[
      "logs/app-YYY-MM-DD.log",
      "logs/app-readble.log",
      "logs/error-log",
    ]
  })
});

//Rutas para pruebas de excepcion y rejections 
if(process.env.NODE_ENV !== "production"){
  //Habilitando ruta para probar exceptionesHandlers
  //Acceso: GET /test-exception
  router.get("/test-exception", (req, res) => {
    res.json({
      message: "Excepcion lanzada. Revisa logs/exceptions.log"
    })
    //Lanzando una excepcion 
    setTimeout(() => {
      throw new Error("Excepcion no capturada para pruebas");
    }, 300);
  })
  
  //Ruta para rejections
  //Acceso GET /test-rejection
  router.get("/test-rejection", (req, res) => {
    res.json({
      message: "Promesa rechazada. Revisa logs/rejections.log"
    })
    //generando rejection 
  Promise.reject(new Error("Promesa rechazada sin cathc"));
  })
}
export default router;