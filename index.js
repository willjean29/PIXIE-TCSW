//estableciendo variables
const mongoose = require('mongoose');
const morgan = require('morgan');
const Logger = require('./config/loggerService');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const createError = require('http-errors');
const session = require('express-session');
const exphbs = require('express-handlebars');
const ConexionDB = require('./config/db');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const moment = require('moment');

moment.locale('es');  
require('dotenv').config({path: "variables.env"});
// inicializacion
const app = express();
const logger = new Logger('app');
//comentando para git
// configuracion
// app.use(morgan('combined',{stream: logger.stream()}));
morgan.token('host', function(req, res) {
  return req.hostname;
});
app.use(morgan('dev',{stream: logger.stream()}));
app.set('views',path.join(__dirname,'views'));
let blocks = {};
app.engine('hbs',exphbs({
  defaultLayout: "layout",
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials',
  helpers: {
    // url: function(routeName, params) {
    //   return app.locals.url(routeName, params);
    // },
    // activeRoute: function(routeName) {
    //   return routeName === activeRoute ? 'active' : '';
    // },
    // activeRoutes: function(routeNames) {
    //   // TODO
    //   return routeNames.split(',').indexOf(activeRoute) >= 0 ? 'active' : '';
    // },
    block: function(name) {
      let val = (blocks[name] || []).join('\n');

      // clear the block
      blocks[name] = [];
      return val;
    },
    extend: function(name, context) {
      let block = blocks[name];
      if (!block) {
          block = blocks[name] = [];
      }

      block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
    },
    selectGenero: function(seleccionado, opciones){
      return opciones.fn().replace(`value="${seleccionado}"`,`value="${seleccionado}" selected`);
    },
    mostrarAlertas: function (errores = {}, opciones){
      const categoria = Object.keys(errores);
      let html = '';
      if(categoria.length){
        errores[categoria].forEach(error => {
          html += `<div class="${categoria} alerta" id="alerta-error" style="display: none;">
            ${error}
          </div>`
        })//seleccionando genero
      }
      
      return opciones.fn().html = html;
    }
  },
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(flash());

app.use(cookieParser(process.env.SEED_SECRET));
// session and cookies
app.use(session({
  secret: process.env.SEED_SECRET,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));
// passport
app.use(passport.initialize());
app.use(passport.session());
// connect databse
ConexionDB.getInstance();
// globals
app.use((req,res,next) => {
  res.locals.mensajes = req.flash();
  next();
})

// routes
// app.use(routes);
app.use(routes);

// 404 página de error
app.use((req,res,next) => {
  next(createError(404,'Not found'));
})

// administrar error
app.use((error,req,res,next) => {
 
  res.locals.mensaje = error.message;
  const status = error.status || 500;
  res.locals.status = status;
  res.status(status);
  logger.error('Error al cargar un recurso',{
    status: status,
    error
  })
  res.render('error',{
    layout: 'auth'
  });
})

// server running
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
  logger.info(`Servidor Corriendo en el puuerto ${PORT}` , {
    "success": true
  })
})
