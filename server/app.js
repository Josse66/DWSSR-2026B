//funcion para manejar errores
var createError = require('http-errors');
//importa el framework express
var express = require('express');
//imporeta modulos para importar rutas
var path = require('path');
//importa modulos para manejar cookies
var cookieParser = require('cookie-parser');
//importa modulos para manejar logs
var logger = require('morgan');

//importa las rutas de la aplicacion
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//crea la aplicacion de express
var app = express();

// view engine setup, configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//configurar middelwares de la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//configura la ruta de archivos estaticos
app.use(express.static(path.join(__dirname, '..','public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
