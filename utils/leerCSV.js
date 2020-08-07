const XLSX = require('xlsx');
const path = require('path');
const leerCSV = (fileName) => {
  const url = path.resolve(__dirname,`../public/uploads/documents/${fileName}`);
  const excel = XLSX.readFile(url);
  const nombre = excel.SheetNames;
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombre[0]]);
  return datos;
}

module.exports = {
  leerCSV
}