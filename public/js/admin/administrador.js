import clienteAxios from '../config/clienteAxios';
import {obtenerToken} from '../config/config';
import tokenAuth from '../config/token';
import moment from 'moment';
import Swal from 'sweetalert2';
console.log("admin js");

const formModificarAdmin = document.getElementById('form-admin-modificar');

if(formModificarAdmin){
  formModificarAdmin.addEventListener('submit',modificarAdmin);

}

function modificarAdmin(event){
  event.preventDefault();
  console.log("modificar");
  const data = new FormData(formModificarAdmin);
  const fecha = data.get('fechaNacimiento');
  const fechaNacimiento = fecha.split("/").reverse().join("-");
  console.log(fechaNacimiento);
  const dataAdmin = {
    fechaNacimiento,
    genero: data.get('genero'),
    cargo: data.get('cargo'),
    direccion: data.get('direccion'),
    telefono: data.get('telefono'),
    celular: data.get('celular'),
    departamento: data.get('departamento'),
    provincia: data.get('provincia'),
    distrito: data.get('distrito')
  }
  const url = '/admin/modificar';
  clienteAxios.put(url,dataAdmin)
    .then((resp) => {
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: "Se actualizo con exito",
          icon: 'success',
          timer: 1500
        })

        setTimeout(() => {
          location.reload();
        },1500)
      }
    })
    .catch((error) => {
      Swal.fire({
        title: 'Hubo un error',
        text: "No se pudo actualizar los datos",
        icon: 'error',
        timer: 1500
      })
    })


}