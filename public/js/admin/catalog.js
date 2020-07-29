import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
let inputFileMultiIMG = document.getElementById("file-img-multi");
const containerItems = document.getElementById("contenier-items");

let contenedorPremios = document.getElementById('contenier-items');
const formCatalogo = document.getElementById('form-catalogo');


if(inputFileMultiIMG){
  inputFileMultiIMG.addEventListener('change',function() {
    const files = Array.from(this.files);
    files.forEach((file,index) => {
      mostrarSpinner(containerItems,1500);
      setTimeout(() => {
        crearItemPremio(file,index);  
      },1500);   
    });
  })
}

if(contenedorPremios){
  contenedorPremios.addEventListener('click',eliminarItem)
}

if(formCatalogo){
  formCatalogo.addEventListener('submit',registrarCatalogo);
}


function crearItemPremio(file,index){
  let num = index + 1;
  const reader = new FileReader();
  reader.addEventListener('load',function(){
    // contenedor de item-premio
    let divItem = document.createElement("div");
    divItem.classList.add('item-premio');
    divItem.innerHTML = `
      <label for="inputState" class="w-100">Premio</label>
      <button type="button" class="close close-container" aria-label="Close" id="close-container">
        <span aria-hidden="true" id="close-item" class="close-item">&times;</span>
      </button>
    `;
    // contenedor fila
    let divForm =document.createElement('div');
    divForm.classList.add('form-row');

    // contenedor imagenes
    let divImage = document.createElement('div');
    divImage.classList.add('form-group', 'col-md-3' ,'container-premio');
    // image
    let image = document.createElement('img');
    image.classList.add('img-fluid','img-thumbnail');
    image.src = this.result;


    // agregar elementos al item-premio
    divImage.appendChild(image);
    divForm.appendChild(divImage);
    divForm.innerHTML += `
        <div class="form-group col-md-9">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="estado">Nombre</label>
            <input required type="text" class="form-control" id="nombre" name="nombre">
          </div>
          <div class="form-group col-md-6">
            <label for="tipo">Precio</label>
            <input required type="number" class="form-control" id="precio" name="precio" min="0">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="estado">Categoria</label>
            <input required type="text" class="form-control" id="categoria" name="categoria">
          </div>
          <div class="form-group col-md-6">
            <label for="tipo">Puntos</label>
            <input required type="number" class="form-control" id="puntos" name="puntos" min="0">
          </div>
        </div>
        <div class="form-group">
          <label for="direccion">Descripción</label>
          <textarea name="descripcion" requerid  class="form-control" id="descripcion" cols="30"></textarea>
        </div>
      </div> 
    `;
    divItem.appendChild(divForm);
    containerItems.appendChild(divItem);

  })
  reader.readAsDataURL(file);
}

function mostrarSpinner(Container,timer){
  let divSpinner = document.createElement('div');
  divSpinner.setAttribute('id','spinner-item');
  divSpinner.classList.add('d-flex','justify-content-center','my-5');
  divSpinner.innerHTML = `
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `;
  Container.appendChild(divSpinner);
  setTimeout(() => {
    const Spinner = document.getElementById('spinner-item');
    Spinner.remove();
  },timer);
}

function eliminarItem(event){
  
  if(event.target.classList.contains('close-item')){
    let contenedorItem = event.target.parentElement.parentElement;
    contenedorItem.remove();
  }

}

function registrarCatalogo(event){  
  event.preventDefault();
  const data = new FormData(formCatalogo);
  // const files = document.getElementById("file-img-multi").files;
  // const dataCatalogo = {
  //   // image: Array.from(files).map((file) => Array.from(file)),  
  //   name: data.getAll('nombre'),
  //   points: data.getAll('puntos'),
  //   prices: data.getAll('precio'),
  //   description: data.getAll('descripcion'),
  //   categoria: data.getAll('categoria')
  // };
  // console.log(dataCatalogo);
  // return;
  const url = "/catalog/registrer";
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'dir': data.get('dir')
    }
  };

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
          window.location.href = "/catalog/list";
        }, 1000);
      }
    })
    .catch((error) => {
      Swal.fire({
        title: 'Hubo un error',
        text: "No se pudo registrar",
        icon: 'error',
        timer: 1500
      })
    })

  // console.log(dataCatalogo);
}

