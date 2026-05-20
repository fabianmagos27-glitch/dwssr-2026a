import createError from 'http-errors';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

//Importando winston para logging
import logger from './lib/winston.js';


// Importando enrutadores con rutas relativas correctas
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authorRouter from './routes/author.js';

//importando el configurador de handlebars
import { configureHandlebars } from './lib/handlebars.js';



// Recreando variables de entorno para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

logger.info("Crenado la instancias de expressjs")
var app = express();
logger.info("Inicia configuracion de express")
configureHandlebars(app);



//redirigiendo el flujo de logs de morgan 
// a winston
//morgan --> [logs] --> winston --> consola y archivos

app.use(morgan('dev', {
  stream: {
    write: (message) => logger.http(message.trim()),
  },
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estáticos generales
app.use(express.static(path.join(__dirname, '../public')));

// Configuración para producción
if (process.env.NODE_ENV === "production" ){
  app.use(express.static(path.join(__dirname, '..', 'dist')));

  console.log("Ruta: " + path.join(__dirname, 'public'));
}

// Registro de rutas en la aplicación
app.use(['/', '/index'], indexRouter);
app.use('/users', usersRouter);
app.use('/author', authorRouter);

// Manejador de error 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manejador de errores generales

app.use(function(err, req, res, next) { 
  logger.error(`Error ${err.status || 500}: ${err.message}`);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? {
    status: err.status || 500,
    stack: err.stack
  } : {};

});

export default app;