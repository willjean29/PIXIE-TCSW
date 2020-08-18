import Swal from 'sweetalert2';
import clienteAxios from '../config/clienteAxios';
const inputFileCSV = document.getElementById('file-csv');
const labelCSV = document.getElementById('label-csv');
const formFileCSV = document.getElementById('form-file-csv');
const buttonEnviarFileCSV = document.getElementById('btn-enviar-file');
const progressBarFile = document.getElementById('progress-bar-file');

const tablaArchivos = document.getElementById('tabla-archivos');

if(inputFileCSV){
  inputFileCSV.addEventListener('change',function() {
    const file = this.files[0];
    console.log(file);
    const type = file.type.split('/')[1];
    console.log(type)
    if(file){
      if(type === "vnd.ms-excel"){
        labelCSV.innerHTML = file.name;
        buttonEnviarFileCSV.removeAttribute('disabled');
      }else{
        console.log("error de archivo")
        Swal.fire({
          title: 'Hubo un error',
          text: "Solo se admiten archivos .csv",
          icon: 'error',
          timer: 1500
        })
        labelCSV.innerHTML = "Ingresar Archivo";
        buttonEnviarFileCSV.setAttribute('disabled', 'disabled');
      }
    }
  })
}

if(formFileCSV){
  formFileCSV.addEventListener('submit', enviarArchivo);
}

if(tablaArchivos){
  tablaArchivos.addEventListener('click',cargarDatosClientes)
}

function enviarArchivo(event) {
  event.preventDefault();
  const data = new FormData(formFileCSV);
  const url = '/file/upload';
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress(event){
      console.log(Math.round((event.loaded * 100) / event.total));
      const progress = (event.loaded * 100) / event.total;
      progressBarFile.setAttribute('value',progress);
    }
  };
  console.log("enviando ...")
  clienteAxios.post(url,data,config)
    .then((resp) => {
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: "Se registro con exito",
          icon: 'success',
          timer: 1500
        })

        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    })
    .catch((error) => {
      const msg = error.response.data.err.msg;
      Swal.fire({
        title: 'Hubo un error',
        text: msg,
        icon: 'error',
        timer: 1500
      })
    })
 
}

function cargarDatosClientes(event){
  if(event.target.classList.contains('btn-carga')){
    const id = event.target.dataset.file;
    console.log(id)
    const url = `/file/clientes/${id}`;
    clienteAxios.get(url)
      .then((resp) => {
        console.log(resp)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}