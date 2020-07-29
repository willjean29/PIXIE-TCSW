import auth from './auth/auth';
import admninistrador from './admin/administrador';
import business from './admin/business';
import competition from './admin/competition';
import catalog from './admin/catalog';
import prize from './admin/prize';
import Swal from 'sweetalert2';
import moment  from 'moment';
import axios from 'axios';
import clienteAxios from './config/clienteAxios';
console.log("hola mundo123");

const token = localStorage.getItem('TOKEN');
if(!token) {
  console.log("no hay token")
  // window.location.href = "/admin/login";
}else{
  console.log("token existe")
}

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

// formulario de avatar
const formAvatar = document.getElementById('form-avatar');
// cargar vista previa de iamgenes
const inputFileIMG = document.getElementById('file-img');
const labelIMG = document.getElementById('label-img');
const previewContainer = document.getElementById('container-preview-img');
const previewIMG = document.getElementById('preview-img');
const defaultIMG = document.getElementById('default-img');

if(inputFileIMG){
  inputFileIMG.addEventListener('change',function(){
    const file = this.files[0];
    console.log(file);
    const type = file.type.split('/')[0];
    if(file){
      if(type === 'image'){
        labelIMG.innerHTML = file.name;
        const reader = new FileReader();
        defaultIMG.style.display = 'none';
        previewIMG.style.display = 'block';
  
        reader.addEventListener('load',function(){
          console.log(this.result)
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

if(formAvatar){
  console.log("formulario de avatar");
  formAvatar.addEventListener('submit',function(event){
    event.preventDefault();
    const data = new FormData(formAvatar);

    // const file = inputFileIMG.files[0];

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
        console.log(error.response.data);
        const msg = error.response.data.err.msg;
        Swal.fire({
          title: 'Hubo un error',
          text: msg,
          icon: 'error',
          timer: 1500
        })
      })
  });
}




