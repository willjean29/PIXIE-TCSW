import auth from './auth/auth';
import admninistrador from './admin/administrador';
import business from './admin/business';
import competition from './admin/competition';
import moment  from 'moment';
console.log("hola mundo");

const token = localStorage.getItem('TOKEN');
if(!token) {
  console.log("no hay token")
  // window.location.href = "/admin/login";
}else{
  console.log("token existe")
}

// cargar vista previa de iamgenes
const inputFileIMG = document.getElementById('file-img');
const labelIMG = document.getElementById('label-img');
const previewContainer = document.getElementById('container-preview-img');
const previewIMG = document.getElementById('preview-img');
const defaultIMG = document.getElementById('default-img');
if(inputFileIMG){
  inputFileIMG.addEventListener('change',function(){
    const file = this.files[0];
    labelIMG.innerHTML = file.name;
    console.log(file);
    if(file){
      const reader = new FileReader();
      defaultIMG.style.display = 'none';
      previewIMG.style.display = 'block';

      reader.addEventListener('load',function(){
        previewIMG.setAttribute("src",this.result);
      })

      reader.readAsDataURL(file);
    }else{
      previewIMG.style.display = null;
      previewIMG.setAttribute("src","");
    }
  })
}



const data = new Date();
console.log(data)
const hoy = moment(data);
const fecha = hoy.format("L");
console.log(fecha );



