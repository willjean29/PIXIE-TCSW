const multer = require('multer');
const path = require('path');
const shortid = require('shortid');

const uploadImage = (req,res,next) => {
  console.log(req.body)
  upload(req,res,function(err) {
    if(err){
      if(err instanceof multer.MulterError){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.status(500).json({
            ok: false,
            err:{
              message: "El archivo es muy pesado : Peso max 500Kb"
            }
          });
        }else{
          return res.status(500).json({
            ok: false,
            err:{
              message: err.message
            }
          });
        }
      }else{
        return res.status(500).json({
          ok: false,
          err:{
            message: err
          }
        });
      }
    }else{
      console.log("llego");
      return next();
    }
  });
}

const upload = multer({
  limits: {fieldSize: 500000},
  storage: fileStorage = multer.diskStorage({
    destination: (req,file,cb) => {
      console.log("procesando img");
      console.log(req.body)
      cb(null,path.join(__dirname,`../public/uploads/perfiles`))
    },
    filename: (req,file,cb) => {
      cb(null,shortid.generate()+path.extname(file.originalname));
    }
  }),
  fileFilter: (req,file,cb) => {
    const filetypes = /jpeg|jpg|gif|png/;
    const mimeType = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if(mimeType && extname) {
      return cb(null,true);
    }
    cb('Error: El archivo debe ser una imagen valida');
  }
}).single('image');

module.exports = {
  uploadImage
}