import authClient from './auth/authClient';
import prizes from './user/prizes';
import axios from 'axios';
import Swal from 'sweetalert2';
// console.log("hola cliente");
// console.log("gaaaaaaa");
let categorias = document.querySelectorAll('.categoria');
const btnCerrarSesion = document.getElementById('logout-cliente');
document.addEventListener('DOMContentLoaded',() => {
  if(categorias){
    seleccionarCategoria();
  }
})
const alertaError = document.getElementById('alerta-error');
// cargar vista previa de iamgenes
const inputFileIMG = document.getElementById('file-img');
const previewIMG = document.getElementById('preview-img');
const defaultIMG = document.getElementById('default-img');

// formulario de avatar
const formAvatar = document.getElementById('form-avatar');
if(inputFileIMG){
  inputFileIMG.addEventListener('change',function(){
    const file = this.files[0];
    console.log(file);
    const type = file.type.split('/')[0];
    if(file){
      if(type === 'image'){
        const reader = new FileReader();
        defaultIMG.style.display = 'none';
        previewIMG.style.display = 'block';
  
        reader.addEventListener('load',function(){
          previewIMG.setAttribute("src",this.result);
        })
  
        reader.readAsDataURL(file);
      }else{
        Swal.fire({
          title: 'Hubo un error',
          text: "Solo es permitido subir imagenes",
          icon: 'error',
          timer: 1500
        })
      }

    }else{
      previewIMG.style.display = null;
      previewIMG.setAttribute("src","");
    }
  })
}

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

if(btnCerrarSesion){
  btnCerrarSesion.addEventListener('click',(event) => {
    event.preventDefault();
    console.log("click")
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Desea cerrar sesion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
       window.location.href = "/cerrar-sesion";
      }
    })
  })
}

if(formAvatar){
  formAvatar.addEventListener('submit',registrarAvatar);
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

function registrarAvatar(event){
  event.preventDefault();
  console.log("enviando");
  const data = new FormData(formAvatar);

  const url = data.get('url');
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'dir': data.get('dir')
    }
  };
  axios.post(url,data,config)
    .then((resp) => {
      console.log(resp)
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: "Se actualizo el avatar con exito",
          icon: 'success',
          timer: 1500
        })

        setTimeout(() => {
          location.reload();
        }, 1500);
      }
    })
    .catch((error) => {
      console.log(error.response);
      const msg = error.response.data.err.msg;
      Swal.fire({
        title: 'Hubo un error',
        text: msg,
        icon: 'error',
        timer: 1500
      })
    })
}


