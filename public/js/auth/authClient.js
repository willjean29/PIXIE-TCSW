import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
let dni = '';
const formDNI = document.getElementById('form-dni');
const formClient = document.getElementById('form-client');
// console.log(formDni);
document.addEventListener('DOMContentLoaded',() => {
  if(formClient){
    formClient.style.display = 'none';
  }
});

if(formDNI){
  console.log("hola desde validar dni");
  formDNI.addEventListener('submit',validarDNI);
}

if(formClient){
  formClient.addEventListener('submit',registrarCliente);
}

function validarDNI(event){
  event.preventDefault();
  console.log("enviando a validar")
  const data = new FormData(formDNI);
  dni = data.get('dni');
  const dataCliente = {
    dni
  }
  let url = '/admin/verificar-dni';
  // capturamos los inputs a llenar (nombres y apellidos)
  const inputNombres = document.getElementById('nombres');
  const inputPaterno = document.getElementById('paterno');
  const inputMaterno = document.getElementById('materno');

  clienteAxios.post(url,dataCliente)
    .then((resp) => {
      console.log(resp)
      if(resp.data.ok){
        const {nombres, apellidoPaterno, apellidoMaterno} = resp.data.user;
        Swal.fire({
          title: 'DNI Valido',
          text: 'Se valido el DNI a registrar',
          icon: 'success',
          timer: 1500
        });

        setTimeout(() => {
          inputNombres.value = nombres;
          inputPaterno.value = apellidoPaterno;
          inputMaterno.value = apellidoMaterno;
          formDNI.style.display = 'none';
          formClient.style.display = 'block';
        }, 1500);
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

function registrarCliente(event){
  event.preventDefault();
  console.log("regiustrar cliente");
  let url = '/registrer';
  const data = new FormData(formClient);
  if(data.get('password') !== data.get('pass')){
    Swal.fire({
      title: 'Hubo un error',
      text: 'Las contraseñas deben ser iguales',
      icon: 'error',
      timer: 1500
    })
    return;
  }
  // capturamos los inpust previamente caragdo con datos
  const inputNombres = document.getElementById('nombres');
  const inputPaterno = document.getElementById('paterno');
  const inputMaterno = document.getElementById('materno');

  let dataCliente = {
    name : inputNombres.value,
    lastName : `${inputPaterno.value} ${inputMaterno.value}`,
    email : data.get('email'),
    password : data.get('password'),
    dni: dni,
    sexo: data.get('genero'),
  }

  clienteAxios.post(url,dataCliente)
    .then((resp) => {
      const {msg} = resp.data;
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: msg,
          icon: 'success',
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500)
      }
    })
    .catch((error) => {
      const {msg} = error.response.data;
      Swal.fire({
        title: 'Hubo un error',
        text: msg,
        icon: 'error',
        timer: 1500
      })
    })
  
}