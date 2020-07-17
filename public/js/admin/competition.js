import clienteAxios from '../config/clienteAxios';
import {obtenerToken} from '../config/config';
import tokenAuth from '../config/token';
import Swal from 'sweetalert2';
const formCompetitionAgregar = document.getElementById('form-competition-agregar');
const formCompetitionModificar = document.getElementById('form-competition-modificar');

if(formCompetitionAgregar){
  formCompetitionAgregar.addEventListener('submit',agregarConcurso);
}

if(formCompetitionModificar){
  formCompetitionModificar.addEventListener('submit',modificarConcurso);
}


function agregarConcurso (event){
  event.preventDefault();
  console.log("crear concurso");
  const url = '/competition/simple/registrar';
  const data = new FormData(formCompetitionAgregar);
  const inputTipo = document.getElementById('tipo');
  // FORMATEANDO FECHAS
  let fechaI = data.get('fechaInicio');
  let fechaF = data.get('fechaFin');
  let fechaInicio = fechaI.split("/").reverse().join("-");
  let fechaFin = fechaF.split("/").reverse().join("-");
  const dataCompetition = {
    name: data.get('nombre'),
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    soles: data.get('soles'),
    puntos: data.get('puntos'),
    tipo: inputTipo.value
  }

  clienteAxios.post(url,dataCompetition)
    .then((resp) => {
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: "Se creo con exito",
          icon: 'success',
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = "/competition/simple/profile";
        },1500)
      }
    })
    .catch((error) => {
      console.log(error.response.data)
      const msg = error.response.data.err.msg;
      Swal.fire({
        title: 'Hubo un error',
        text: msg,
        icon: 'error',
        timer: 1500
      })
    })
}

function modificarConcurso(event){
  event.preventDefault();
  console.log("modificando concurso");
  const url = '/competition/simple/modificar';
  const data = new FormData(formCompetitionModificar);
  // FORMATEANDO FECHAS
  let fechaI = data.get('fechaInicio');
  let fechaF = data.get('fechaFin');
  let fechaInicio = fechaI.split("/").reverse().join("-");
  let fechaFin = fechaF.split("/").reverse().join("-");
  const dataCompetition = {
    name: data.get('nombre'),
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    soles: data.get('soles'),
    puntos: data.get('puntos'),
  }

  clienteAxios.put(url,dataCompetition)
    .then((resp) => {
      console.log(resp.data);
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: "Se actualizo con exito",
          icon: 'success',
          timer: 1500
        })
        setTimeout(() => {
          window.location.href = "/competition/simple/profile";
        },1500)
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