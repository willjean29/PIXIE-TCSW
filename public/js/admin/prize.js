import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
const listaPremios = document.getElementById('lista-premios');
const formCatalogoEditar = document.getElementById('form-catalogo-edit');

if(listaPremios){
  console.log(listaPremios);
  listaPremios.addEventListener('click',mostrarEditarditarPremio);
  listaPremios.addEventListener('click',eliminarPremioID);
}

if(formCatalogoEditar){
  console.log(formCatalogoEditar);
  formCatalogoEditar.addEventListener('submit',editarPremioID);
}

function mostrarEditarditarPremio(event){
  if((event.target.classList.contains('editar'))){
    console.log("editar")

    let id = event.target.dataset.id;
    if(!id){
      id = event.target.parentElement.dataset.id; 
    }
    console.log(id);
    const nombre = document.getElementById('nombre');
    const precio = document.getElementById('precio');
    const categoria = document.getElementById('categoria');
    const puntos = document.getElementById('puntos');
    const descripcion = document.getElementById('descripcion');
    const img = document.getElementById('prize-edit-img');
    const idPrize = document.getElementById('id-prize');
    // actualizar datos
    nombre.value = "datos";
    precio.value = 123;
    categoria.value = "calzado";
    puntos.value = 123;
    descripcion.value = "calzado";

    const url = `/prize/list/${id}`;
    clienteAxios.get(url)
      .then((resp) => {
        console.log(resp.data);
        if(resp.data.ok){
          const prize = resp.data.prize;
          nombre.value = prize.name;
          precio.value = prize.price;
          categoria.value = "";
          puntos.value = prize.points;
          descripcion.value = prize.description;
          img.src = `/uploads/perfiles/prizes/${prize.image}`;
          idPrize.value = id;
        }
      })
      .catch((error) => {
        console.log(error)
      })

  }
}

function eliminarPremioID(event) {
  if((event.target.classList.contains('eliminar'))){
    console.log("eliminar premio");
    let id = event.target.dataset.id;
    if(!id){
      id = event.target.parentElement.dataset.id; 
    }
    const url = `/prize/list/${id}`;
    Swal.fire({
      title: 'Eliminar Premio',
      text: "Un premio eliminado no se puede recuperar",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
       clienteAxios.delete(url)
        .then((resp) => {
          console.log(resp.data)
          if(resp.data.ok){
            Swal.fire({
              title: 'Correcto',
              text: "Se elimino el premio",
              icon: 'success',
              timer: 1500
            })
            location.reload();
          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Hubo un error',
            text: "No se pudo eliminar premio",
            icon: 'error',
            timer: 1500
          })
        })
      }
    })
  }
}

function editarPremioID(event) {
  event.preventDefault();
  console.log("actualizando prermios");
  const id = document.getElementById('id-prize').value;
  const url = `/prize/list/${id}`;

  const data = new FormData(formCatalogoEditar);
  const dataPremio = {
    name: data.get('nombre'),
    description: data.get('categoria'),
    points: data.get('puntos'),
    price: data.get('precio'),
  }
  clienteAxios.put(url,dataPremio)
    .then((resp) => {
      if(resp.data.ok){
        Swal.fire({
          title: 'Correcto',
          text: "Se actualizo el premio",
          icon: 'success',
          timer: 1500
        })
        location.reload();
      }
    })
    .catch((error) => {
      Swal.fire({
        title: 'Hubo un error',
        text: "No se pudo actualizar el premio",
        icon: 'error',
        timer: 1500
      })
    })
}