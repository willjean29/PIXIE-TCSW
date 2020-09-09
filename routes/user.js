const express = require('express');
const app = express.Router();
const userController = require('../controllers/userController');
app.get('/',(req,res) => {
  res.redirect('/login');
});
app.get('/login',(req,res) => {
  res.render('user/auth.hbs',{
    layout: 'user.hbs'
  })
})

app.post('/login',userController.autenticarClliente);

app.get('/registrer',(req,res) => {
  res.render('user/registro.hbs',{
    layout: 'user.hbs'
  })
})

app.post('/registrer',userController.registrarCliente);

app.get('/business',userController.mostrarListadoEmpresas);

app.get('/business/:id',userController.mostrarCatalogoEmpresa);

app.get('/business/:id/:category',userController.mostrarCategoriaCatalogo);

module.exports = app;