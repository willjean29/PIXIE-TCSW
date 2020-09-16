import clienteAxios from '../config/clienteAxios';
const listaPremios = document.getElementById('listado-premios');
if(listaPremios){
  listaPremios.addEventListener('click',mostrarModalComprar);
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
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}