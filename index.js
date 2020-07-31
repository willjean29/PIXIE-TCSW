const mongoose = require('mongoose');
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const createError = require('http-errors');
const session = require('express-session');
const exphbs = require('express-handlebars');
const conectarDB = require('./config/db');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const moment = require('moment');
moment.locale('es');  
require('dotenv').config({path: "variables.env"});
// initializations
const app = express();

// settings
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
        })
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
conectarDB();
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
  next(createError(404, 'No encontrado'));
})

// administrar error
app.use((error,req,res,next) => {
  console.log(error.message)
  res.locals.mensaje = error.message;
  const status = error.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error',{
    layout: 'auth'
  });
})

// server running
const PORT = process.env.PORT || 4000;
app.listen(PORT,() => {
  console.log("Servidor corriendo en el puerto "+PORT);
})
