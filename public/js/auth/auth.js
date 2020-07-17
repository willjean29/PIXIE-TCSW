import axios from 'axios';
import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
import {guardarToken} from '../config/config';

let dni = '';
const formAdmin = document.getElementById('form-admin');
const formDNI = document.getElementById('form-dni');
const formToken = document.getElementById('form-token');
const formAdminLogin = document.getElementById('form-admin-login');
const buttonCerrarSesion = document.getElementById('button-logout');

document.addEventListener('DOMContentLoaded',() => {
  if(formAdmin){
    formAdmin.style.display = 'none';
  }
});


if(formToken){
  formToken.addEventListener('submit',(event) => {
    event.preventDefault();
    let url = "/admin/validarToken";
    const datos = new FormData(formToken);
    const token = datos.get("token");
    axios.post(url,{token})
      .then((resp) => {
        console.log(resp);
        console.log(resp.data)
        if(resp.data.ok){
          Swal.fire({
            title: 'Token Valido',
            text: 'Se valido el token del WebMaster',
            icon: 'success',
            timer: 1500
          });
          setTimeout(() => {
            window.location.href = '/admin/registrer';
          }, 1500);
        }else{
          Swal.fire({
            title: 'Token no Valido',
            text: 'El token ingresado no existe',
            icon: 'error',
            timer: 1500
          })
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'Hubo un error',
          text: 'No se pudo procesar el token',
          icon: 'error',
          timer: 1500
        })
      })
  })
}

if(formDNI){
  formDNI.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(formDNI);
    dni = data.get('dni');
    const dataAdmin = {
      dni
    }
    let url = '/admin/verificar-dni'
    // capturamos los inputs a llenar (nombres y apellidos)
    const inputNombres = document.getElementById('nombres');
    const inputPaterno = document.getElementById('paterno');
    const inputMaterno = document.getElementById('materno');

    axios.post(url,dataAdmin)
      .then((resp) => {
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
            formAdmin.style.display = 'block';
          }, 1500);
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: 'DNI Invalido',
          text: 'No se pudo verificar el DNI',
          icon: 'error',
          timer: 1500
        });
      })
  })
}

if(formAdmin){
  console.log(formAdmin);
  formAdmin.addEventListener('submit',(event) => {
    event.preventDefault();
    let url = '/admin/registrer';
    const data = new FormData(formAdmin);
    if(data.get('password') !== data.get('pass')){
      Swal.fire({
        title: 'Hubo un error',
        text: 'Las contraseñas deben ser iguales',
        icon: 'error',
        timer: 1500
      })
      return;
    }
    // capturamos los inpust previamente caragdo con datos;
    const inputNombres = document.getElementById('nombres');
    const inputPaterno = document.getElementById('paterno');
    const inputMaterno = document.getElementById('materno');
    console.log(inputMaterno.value);
    let dataAdmin = {
      names : inputNombres.value,
      lastNameP : inputPaterno.value,
      lastNameA : inputMaterno.value,
      email : data.get('email'),
      password : data.get('password'),
      dni: dni 
    }

    axios.post(url,dataAdmin)
      .then((resp) => {
        const {msg} = resp.data;
        console.log(msg);
        if(resp.data.ok){
          Swal.fire({
            title: 'Correcto',
            text: msg,
            icon: 'success',
            timer: 1500
          })
          setTimeout(() => {
            window.location.href = '/admin/login';
          }, 1500)
        }
      })
      .catch((error) => {
        console.log(error.response);
        const {msg} = error.response.data;
        console.log(msg)
        Swal.fire({
          title: 'Hubo un error',
          text: msg,
          icon: 'error',
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = '/admin/registrer';
        }, 1500)
      })
  })
}

if(formAdminLogin){
  console.log(formAdminLogin);
  console.log("jsw")
  formAdminLogin.addEventListener('submit',(event) => {
    event.preventDefault();
    const data = new FormData(formAdminLogin);
    const url = "/admin/login2";
    const dataAdmin = {
      email: data.get('email'),
      password: data.get('password')
    }
    clienteAxios.post(url,dataAdmin)
      .then((resp) => {
        console.log(resp.data)
        // const {msg} = resp.data;
        // console.log(msg);
        if(resp.data.ok){
          const {names} = resp.data.administrator;
          let {token} = resp.data;
          Swal.fire({
            title: 'Correcto',
            text: `Bienvenid@ ${names}`,
            icon: 'success',
            timer: 1500
          })
          // almcenamos el token de usuario en localstorage
          guardarToken(token);
          setTimeout(() => {
            // window.location.href = '/admin';
            mostrarHomeAdmin()
          }, 1500)
        }
      })
      .catch((error) => {
        console.log(error.response.data);
        const {msg} = error.response.data.err;
        Swal.fire({
          title: 'Hubo un error',
          text: msg,
          icon: 'error',
          timer: 1500
        })
      });
  })
}

if(buttonCerrarSesion){
  buttonCerrarSesion.addEventListener('click',(event) => {
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
       axios.get('/admin/cerrar-sesion')
        .then((resp) => {
          if(resp.data.ok){
            console.log("cerrando sesion ....");
            window.location.href = '/admin/login';
          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Hubo un error',
            text: "No se pudo cerrar sesión",
            icon: 'error',
            timer: 1500
          })
        })
        console.log('cerrando sesion ...');
      }
    })
  })
}



export default formToken;