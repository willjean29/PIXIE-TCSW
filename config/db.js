const mongoose = require('mongoose');
const Logger = require('../config/loggerService');
const logger = new Logger('app');
require('dotenv').config({path : "variables.env" });

//  funcion removida
// const conectarDB = async() =>{
//   try {
//     await mongoose.connect(process.env.DB_PIXIE,{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false
//     })
//     console.log("Database conectada");
//   } catch (error) {
//     console.log("Error database");
//     console.log(error);
//     process.exit(1);
//   }
// }

class ConexionDB{
  constructor(){
    this.conectarDB();
  }

  static getInstance(){
    if(!this.conexionDB){
      this.conexionDB = new ConexionDB();
    }else{
      return this.conexionDB
    }
  }
  async conectarDB (){
    try {
      await mongoose.connect(process.env.DB_PIXIE,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      logger.info("Database Conextada" ,{
        success: true,
      })
    } catch (error) {
      logger.error("Error database",{
        error
      });
      process.exit(1);
    }
  }
}

module.exports = ConexionDB;