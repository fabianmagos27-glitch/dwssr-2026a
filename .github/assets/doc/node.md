# 🟩NodeJs

[Node](https://nodejs.org/es) es un entorno de ejeución Javascript
multiplataforma de código abierto y gratuito.

Dentro de los frameworks para crear servidores web para NODE tenemos :
-[Fastify](https://fastify.dev/)
-[AdoniJs](https://adonisjs.com/)
-[NestJs](https://nestjs.com/)
-[koa](https://koajs.com/)
-[ExpressJS](https://expressjs.com/)

# ExpresJS

Expres es un _framwork_ para Node,minimo flexible  no es impositivo tanto omo en el flujo de trabajon como en la arquitectura del proyecto.

# ESM

Los ECMAScript modules (EMS) representan el estandar nativo
para organizar y modulirizar codigo de Javascript
El Express-Generator genera un proyecto usando el antiguo
estandar llamado _CommonJS_ que usa las sentencias `require`
es nuevo estandar usa `export/import`.

Migrar a ESM ofrece las siguientes ventajas:

- Sintaxis moderna y consistente
- Mejor analisis estatico** 
- Importacion asìncronas con `import()`
- Es el futuro del ecosistema

# 😈 Nodemon
[Nodemon](https://nodemon.io/) es un paquete que actua como 
un wrapper (envoltorio) para Node.Js
Su funcion es observar archivos
en el directorio de tu proyecto 
y reinicia automaticamente la 
aplicacion cuando decteta cambios
guardados.

# ✂️ Aliases

los *import Aliases* tambien conocidos como
path aliases o module aliases son atajos o 
alias que podemos configurar para simplificar
la forma en la que importamos modulos en nuestra
aplicacion

#Loggers
Winston-daily-rotate-fill es un transporte de winston
 que permite la rotación automatica de archivos de logs
  basada en fechas.
Esto evita que los archivos de log crezcan sin control.