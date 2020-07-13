import auth from './auth/auth';
import admninistrador from './admin/administrador';
import business from './admin/business';
import competition from './admin/competition';
console.log("hola mundo");

const token = localStorage.getItem('TOKEN');
if(!token) {
  console.log("no hay token")
  // window.location.href = "/admin/login";
}else{
  console.log("token existe")
}
