const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
let dir = "";
const uploadImage = (req,res,next) => {
  dir = req.headers.dir;
  console.log(dir)
  upload(req,res,function(err) {
    if(err){
      if(err instanceof multer.MulterError){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.status(500).json({
            ok: false,
            err:{
              msg: "El archivo es muy pesado : Peso max 500Kb"
            }
          });
        }else{
          return res.status(500).json({
            ok: false,
            err:{
              msg: err.message
            }
          });
        }
      }else{
        return res.status(500).json({
          ok: false,
          err:{
            msg: err
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
      cb(null,path.join(__dirname,`../public/uploads/perfiles/${dir}`))
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