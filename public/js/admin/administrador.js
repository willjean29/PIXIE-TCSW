import clienteAxios from '../config/clienteAxios';
import {obtenerToken} from '../config/config';
import tokenAuth from '../config/token';

console.log("admin js");

const infoAdmin = document.getElementById('admin-info-nav');


document.addEventListener('DOMContentLoaded',() => {
  if(infoAdmin){
    cargarInfoAdmin();
  }
})

const cargarInfoAdmin = () => {
  let token = obtenerToken();
  if(token){
    tokenAuth(token);
  }

  clienteAxios.get('/admin/auth')
    .then((resp) => {
      const adminName = document.getElementById('admin-name');
      const adminImg = document.getElementById('admin-img');
      const {names} = resp.data.administrator;
      adminName.innerHTML = names;
    })
    .catch((err) => {
      console.log(err.response.data)
    });
}