import Swal from 'sweetalert2';
import clienteAxios from '../config/clienteAxios';
import {obtenerToken} from '../config/config';
import tokenAuth from '../config/token';

let rucBusiness = '';
const formBusinessCreate = document.getElementById('form-business-create');
const formBusinnessRUC = document.getElementById('form-business-ruc');

document.addEventListener('DOMContentLoaded',() => {
  console.log('business')
  if(formBusinessCreate){
    formBusinessCreate.style.display = 'none';
  }
})

if(formBusinnessRUC){
  console.log(formBusinnessRUC);
  formBusinnessRUC.addEventListener('submit',validarRuc);
}

if(formBusinessCreate){
  formBusinessCreate.addEventListener('submit',registrarEmpresa);
}

// funciones
function validarRuc (event){
  event.preventDefault();
  const dataRUC = new FormData(formBusinnessRUC);
  const ruc = {
    ruc: dataRUC.get('ruc'),
  }
  rucBusiness = dataRUC.get('ruc');
  const url = '/business/verificar-ruc';

  // capturamos los inputs a llenar
  const inputRazonSocial = document.getElementById('razon-social');
  const inputNombreComercial = document.getElementById('nombre-comercial');
  const inputDireccion = document.getElementById('direccion');
  const inputEstado = document.getElementById('estado');
  const inputTipo = document.getElementById('tipo');
  const inputDepartamento = document.getElementById('departamento');
  const inputProvincia = document.getElementById('provincia');
  const inputDistrito = document.getElementById('distrito');

  clienteAxios.post(url,ruc)
    .then((resp) =>{
      console.log(resp.data)
      if(resp.data.ok){
        const {razonSocial,nombreComercial,direccion,estado,
          tipo,departamento,provincia,distrito} = resp.data.business;
        Swal.fire({
          title: 'RUC Valido',
          text: 'Se valido el RUC a registrar',
          icon: 'success',
          timer: 1500
        });

        setTimeout(() => {
          inputRazonSocial.value = razonSocial;
          inputNombreComercial.value = nombreComercial;
          inputDireccion.value = direccion;
          inputEstado.value = estado;
          inputTipo.value = tipo;
          inputDepartamento.value = departamento;
          inputProvincia.value = provincia;
          inputDistrito.value = distrito;
          formBusinnessRUC.style.display = 'none';
          formBusinessCreate.style.display = 'block';
        },1500)
      }
    })
    .catch((error) => {
      const {msg} = error.response.data.err;
      Swal.fire({
        title: 'RUC no Valido',
        text: msg,
        icon: 'error',
        timer: 1500
      });
    });
}

function registrarEmpresa (event){
  event.preventDefault();
  const dataBusiness = new FormData(formBusinessCreate);
  const url = '/business/registrar';

  // capturamos los inputs con informacion 
  const inputRazonSocial = document.getElementById('razon-social');
  const inputNombreComercial = document.getElementById('nombre-comercial');
  const inputDireccion = document.getElementById('direccion');
  const inputEstado = document.getElementById('estado');
  const inputTipo = document.getElementById('tipo');
  const inputDepartamento = document.getElementById('departamento');
  const inputProvincia = document.getElementById('provincia');
  const inputDistrito = document.getElementById('distrito');

  const business = {
    ruc: rucBusiness,
    nombreComercial: inputNombreComercial.value,
    razonSocial: inputRazonSocial.value,
    tipo: inputTipo.value,
    estado: inputEstado.value,
    direccion: inputDireccion.value,
    departamento: inputDepartamento.value,
    provincia: inputProvincia.value,
    distrito: inputDistrito.value,
    web: dataBusiness.get('web'),
    facebook: dataBusiness.get('facebook'),
    red: dataBusiness.get('red')
  }
  console.log(business);

  clienteAxios.post(url,business)
    .then((resp) => {
      console.log(resp);
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: 'Se registro la empresa con exito',
          icon: 'success',
          timer: 1500
        });
      }
    })
    .catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Hubo un error',
        text: 'No se pudo registrar la empresa',
        icon: 'error',
        timer: 1500
      });
    });

}

