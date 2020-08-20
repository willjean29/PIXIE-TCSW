const multer = require('multer');
const path = require('path');
const shortid = require('shortid');
let dir = "";
const uploadCSV = (req,res,next) => {
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
      cb(null,path.join(__dirname,`../public/uploads/documents`))
    },
    filename: (req,file,cb) => {
      cb(null,shortid.generate()+path.extname(file.originalname));
    }
  }),
  fileFilter: (req,file,cb) => {
    console.log(file)
    const filetypes = /csv|vnd.ms-excel|txt|doc/;
    const mimeType = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if(mimeType && extname) {
      return cb(null,true);
    }
    cb('Error: El archivo debe ser un documento valida');
  }
}).single('csv');

module.exports = {
  uploadCSV
}