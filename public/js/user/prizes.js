import clienteAxios from '../config/clienteAxios';
import Swal from 'sweetalert2';
const listaPremios = document.getElementById('listado-premios');
const btnComprar = document.getElementById('bnt-comprar');
const modalCanjear = document.getElementById('exampleModal');
if(listaPremios){
  listaPremios.addEventListener('click',mostrarModalComprar);
}

if(modalCanjear){
  modalCanjear.addEventListener('click',canjearPremio)  
}

function mostrarModalComprar(event){
  if(event.target.classList.contains('comprar')){
    console.log("comprar");
    let id = event.target.dataset.id;
    if(!id){
      id = event.target.parentElement.dataset.id; 
    }
    console.log(id);
    const imagen = document.getElementById('imagen-premio');
    const titulo = document.getElementById('titulo-premio');
    const descripcion = document.getElementById('descripcion-premio');
    const puntos = document.getElementById('puntos-premio');
    const idPremio = document.getElementById('id-premio');
    const url = `/prize/list/${id}`;
    clienteAxios.get(url)
      .then((resp) => {
        console.log(resp)
        if(resp.data.ok){
          const premio = resp.data.prize;
          imagen.src = premio.url;
          titulo.innerHTML = premio.name;
          descripcion.innerHTML = premio.description;
          puntos.innerHTML = premio.points;
          idPremio.value = premio._id;
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

function canjearPremio(event){
  if(event.target.classList.contains('canjear')){
    const id = document.getElementById('id-premio').value;
    const empresa = document.getElementById('id-empresa').value;
    const url = `/prizes/${id}`;

    Swal.fire({
      title: 'Canjear Premio',
      text: "Los puntos se descontaran del total acumulado",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, continuar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.value) {
       clienteAxios.post(url,{empresa})
        .then((resp) => {
          console.log(resp.data)
          if(resp.data.ok){
            Swal.fire({
              title: 'Correcto',
              text: resp.data.msg,
              icon: 'success',
              timer: 1500
            })
            location.reload();
          }else{
            Swal.fire({
              title: 'Hubo un problema',
              text: resp.data.msg,
              icon: 'error',
              timer: 1500
            })
            location.reload();
          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Hubo un error',
            text: "No se pudo canjear el premio",
            icon: 'error',
            timer: 1500
          })
        })
      }
    })
  }
}
