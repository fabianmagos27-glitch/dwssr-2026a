//importando biblioteca winston
import winston, { format } from 'winston';
import path from 'node:path';
import fs from 'node:fs';

//importando biblioteca de transporte
import DailyRotateFile from 'winston-daily-rotate-file';

//Desctructurando funciones de format
const { combine, timestamp, label, printf, colorize, prettyPrint } = format;

// Creando los directorios raiz
const __rootDir = path.resolve(process.cwd());

//Directorio de logs en 
//la raiz del proyecto 
const logDir = path.join(__rootDir, 'logs');

//Rutina que crea la carpeta donde iran los logs solo
//en caso de no existir
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

//Definiedno esquema de colores
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

//Agregando esquema de colores a winston
winston.addColors(colors);

//Creamos los formato de salida para los diferentes transportes 
const myConsoleFormat = combine(
  //Agregando colores a este formato 
  colorize({ all: true }),

  //Agregando una etiqueta a log 
  label({ label: '📢' }),

  //Agregando formato de fecha 
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),

  //Funcion de impresion 
  printf(
    info =>
      `${info.timestamp} ${info.label} ${info.level}: ${info.message}`,
  ),
);

//Formato para archivos 
const myFileFormat = combine(
  //Quitando colorizacion 
  format.uncolorize(),

  //Agregamos fecha con formato ISO
  timestamp(),

  //Salida en formato JSON
  format.json(),
);

// Creando el objeto de opciones para cada transporte
const options = {
  errorFile: {
    level: "error",
    filename: path.join(logDir, "error.log"),
    maxsize: 5242880, //5MB
    maxFiles: 5,
    format: myFileFormat,
  },

  console: {
    level: "debug",
    handleExceptions: true,
    format: myConsoleFormat,
  },

  readableFile: {
    filename: path.join(logDir, "app-readable.log"),
    level: "info",

    format: combine(
      format.uncolorize(),
      timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
      prettyPrint(),
    ),

    maxsize: 5242880,
    maxFiles: 5,
  },

  dailyRotateFile: {
    filename: path.join(logDir, "app-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
    level: "info",
    format: myFileFormat,
  },
};

//creando el una instancia del logger
/*
usaremos un transport diario (DailyTotateFile) para el log principal, esto facilita la retencion 
por fecha y la comprension de archivos

para los demas logs mantenemos archivos separsdos.
*/
const logger = winston.createLogger({
  transports: [
    //log principal con rotacion por fecha
    new DailyRotateFile(options.dailyRotateFile),

    //archivo legible para humanos
    new winston.transports.File(options.readableFile),

    //log para la consola de desarrollo (colores, y formato)
    new winston.transports.Console(options.console),
  ],

  //caprura de exepciones 
  exceptionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "exceptions.log"),
    }),
  ],

  rejectionHandlers: [
    new winston.transports.File({
      filename: path.join(logDir, "rejections.log"),
    }),
  ],

  exitOnError: false,
});

//finalmente exportamos el logger 
export default logger;