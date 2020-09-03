import authClient from './auth/authClient';
// console.log("hola cliente");
// console.log("gaaaaaaa");
const alertaError = document.getElementById('alerta-error');
if(alertaError){
  console.log("alerta de errpres")
  const msg = alertaError.innerHTML.trim();
  // toastr.error(msg, "Error");
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
  }
  toastr.error(msg, "Error");
}