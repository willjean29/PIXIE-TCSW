const jwt = require('jsonwebtoken');
require('dotenv').config({ path : "variables.env"});

const verificarToken = (req,res,next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED_JWT,(err,decoded) => {
    if(err){
      // pruebas en Rest API 
      return res.status(401).json({
        ok: false,
        err: {
          msg: "'Token no valido"
        }
      })

      // Redireccionar en el sistema
      // return res.redirect('/admin/login'):
    }

    req.administrator = decoded.administrator;
    next();
  })
}

module.exports = {
  verificarToken
}