import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
//importando winston Logger
import Logger from './lib/winston.js';
import hbs from 'hbs';


//importando enrutadores
import indexRouter from '#routes/index.js';
import usersRouter from '#routes/users.js';
import authorRouter from '#routes/author.js';
//Importando el registradoe de helpers
import { registerViteHelper } from './lib/vite.js';
import logger from './lib/winston.js';

//import app from '../app.js';
var app = express();
logger.info("Creando la instacia de express");
logger.info("Se inicia con la instacia");


//Recreando variable de path
// Asegúrate de que sean DOS guiones bajos: __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//Registrando Helpers para el Engine
registerViteHelper(hbs)
//Redirigiendo el flujo de logs de morgan
//a winston
//morgan ya genera ->[logs]--> Winston-->transportes
app.use(morgan('dev',{
  stream: {
    write: (msg) => Logger.http(msg.trim())
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//Archivos estaticos de vite
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname,'..','dist')));
}
// Archivos estaticos del backend
app.use(express.static(path.join(__dirname,'..','public')));
app.use(express.static(path.join(__dirname, '../public')));
console.log("Ruta:  "+  path.join(__dirname, 'public'));

//registrando las rutas a los enrutadores
app.use(['/','/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.warn('Se consulto la ruta no encontrada${req.originalUrl}');
  next(createError(404));
});

// error handler
//eslint-disable-next-line no-unused-vars
app.use(function(err, req, res, next) {
  logger.error(`Error ${err.status || 500} -> $(err.message)`);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//module.exports = app;
export default app;