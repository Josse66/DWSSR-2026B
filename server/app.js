//funcion para manejar errores
import createError from 'http-errors'
//importa el framework express
import express from 'express'
//imporeta modulos para importar rutas
import path, {dirname} from 'node:path'
//importa modulos para manejar cookies
import cookieParser from 'cookie-parser';
//importa modulos para manejar logs
import morgan from 'morgan'
//importando debug
//import importdebug from 'debug'
//imports para crear Dirname
import { fileURLToPath } from 'node:url';



//importa las rutas de la aplicacion
import indexRouter from '#routes/index.js'
import usersRouter from '#routes/users.js'
//importando el registrador del helper
//importando la funciona de configuracion de hbs
import configureHandlebars from './lib/handlebars.js';
import logger from './lib/winston.js'


//creando backend
logger.info("🔨 creando backend")

//creando las variables de rutas
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//crea la aplicacion de express
const app = express();


// view engine setup, configura el motor de vistas
configureHandlebars(app)

//configurar middelwares de la aplicacion
//morgan manda sus logs de peticiones http a winston en lugar de imprimirlos directo en consola
app.use(
  morgan('dev', {
    stream: {
      write: (msg) => logger.info(msg.trim())
    }
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//archivos estaticos para produccion
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, '..','dist')));
}


//creando servidor de archivos estaticos
logger.info("🔨 creando servidor de archivos estaticos")
//configura la ruta de archivos estaticos
app.use(express.static(path.join(__dirname, '..','public')));

//registrando rutas
logger.info("🛤️  registrando rutas")
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((_req, _res, _next) => {
  _next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? {
    status: err.status || 500,
    stack: err.stack
  } : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//(()=>{
 // if (10 == age) {
   // console.log("Codigo")
 // } 
//})()
export default app;