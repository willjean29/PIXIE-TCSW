const mongoose = require('mongoose');
require('dotenv').config({path : "variables.env" });
const conectarDB = async() =>{
  try {
    await mongoose.connect(process.env.DB_PIXIE,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    console.log("Database conectada");
  } catch (error) {
    console.log("Error database");
    console.log(error);
    process.exit(1);
  }
}

module.exports = conectarDB;