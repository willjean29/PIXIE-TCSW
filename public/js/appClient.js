import authClient from './auth/authClient';
// console.log("hola cliente");
// console.log("gaaaaaaa");
let categorias = document.querySelectorAll('.categoria');
document.addEventListener('DOMContentLoaded',() => {
  if(categorias){
    seleccionarCategoria();
  }
})
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

function seleccionarCategoria(){
  const categoriaArray = window.location.pathname.split("/");
  const categoriaActual = decodeURI(categoriaArray[3]);
  categorias = Array.from(categorias);
  for (const categoria of categorias) {
    const href = categoria.getAttribute("href");
    const hrefaArray = href.split("/");
    const hrefActual = hrefaArray[3];
    console.log(hrefActual)
    if( hrefActual === categoriaActual){
      categoria.classList.add('select-category');
    }
  }
}


