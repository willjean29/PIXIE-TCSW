import clienteAxios from '../config/clienteAxios';
import {obtenerToken} from '../config/config';
import tokenAuth from '../config/token';
const formCompetitionAgregar = document.getElementById('form-competition-agregar');
if(formCompetitionAgregar){
  formCompetitionAgregar.addEventListener('submit',agregarConcurso)
}


function agregarConcurso (event){
  event.preventDefault();
  console.log("crear concurso");
  const url = '/competition/registrar';
  const data = new FormData(formCompetitionAgregar);
  const inputTipo = document.getElementById('tipo');
  const dataCompetition = {
    name: data.get('nombre'),
    fechaInicio: data.get('fechaInicio'),
    fechaFin: data.get('fechaFin'),
    soles: data.get('soles'),
    puntos: data.get('puntos'),
    tipo: inputTipo.value
  }
  let token = obtenerToken();
  if(token){
    tokenAuth(token);
  }
  clienteAxios.post(url,dataCompetition)
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error.response.data)
    })
}