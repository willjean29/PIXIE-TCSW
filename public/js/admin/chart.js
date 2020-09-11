import Chart from 'chart.js';
import clienteAxios from '../config/clienteAxios';
import axios from 'axios';
const clienteGenero = document.getElementById('cliente-genero');
const clientePuntos = document.getElementById('cliente-puntos');
const listaPuntos = document.getElementById('lista-puntos');

const spinnerEstado = document.getElementById('spinner-estado');
const spinnerPuntos = document.getElementById('spinner-puntos');
const spinnerGenero = document.getElementById('spinner-genero');

document.addEventListener('DOMContentLoaded', () => {
  if (clientePuntos) {
    // let randomPromise = Promise.resolve(200);
    axios.all([
      clienteAxios.get('/admin/status/genero'),
      clienteAxios.get('/admin/status/estado'),
      clienteAxios.get('/admin/status/puntos'),
      // randomPromise
    ])
    .then((responses) => {
      let [datagGenero,dataEstado,dataPuntos] = responses;
      let {generoClientes} = datagGenero.data;
      let {estadoClientes} = dataEstado.data;
      let {infoClientes,puntosClientes} = dataPuntos.data;
      if(estadoClientes.length == 0){
          spinnerEstado.style.display = "none";
          clientePuntos.style.display = "block";
          graficaClienteEstado([100,100])
        }else{
          if(estadoClientes[0] == 0 && estadoClientes[1] == 0){
            spinnerEstado.style.display = "none";
            clientePuntos.style.display = "block";
            graficaClienteEstado([100,100]);
          }else{
            spinnerEstado.style.display = "none";
            clientePuntos.style.display = "block";
            graficaClienteEstado(estadoClientes);
          }
        }

        // grafica de estado de genero
        if(generoClientes.length == 0){
          spinnerGenero.style.display = "none";
          clienteGenero.style.display = "block";
          graficaClienteGenero([100,100]);
        }else{
          if(generoClientes[0] == 0 && generoClientes[1] == 0){
            spinnerGenero.style.display = "none";
            clienteGenero.style.display = "block";
            graficaClienteGenero([100,100]);
          }else{
            spinnerGenero.style.display = "none";
            clienteGenero.style.display = "block";
            graficaClienteGenero(generoClientes);
          } 

        }
        // grafica de puntos 
        if(infoClientes.length === 0 || puntosClientes.length === 0){
          spinnerPuntos.style.display = "none";
          listaPuntos.style.display = "block";
          console.log("no hay puntos")
          graficaClientePuntos(["C1","C2","C3","C4","C5"],[100,100,100,100,100]);
        }else{
          spinnerPuntos.style.display = "none";
          listaPuntos.style.display = "block";
          console.log("si hay puntos")

          graficaClientePuntos(infoClientes,puntosClientes);
        }
    })
  }
});


function graficaClienteEstado(datos) {
  const ctx = clientePuntos.getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Inactivos', 'Activos'],
      datasets: [{
        label: '# de clientes',
        data: datos,
        backgroundColor: [
          'rgba(245, 105, 84, 0.2)',
          'rgba(0, 166, 90, 0.2)'
        ],
        borderColor: [
          'rgba(245, 105, 84, 1)',
          'rgba(0, 166, 90, 1)'
        ],
        borderWidth: 1
      }]
    },
  });
}

function graficaClientePuntos(datos,puntos){
  const ctx = listaPuntos.getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datos,
      datasets: [{
        label: '# de puntos',
        data: puntos,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function graficaClienteGenero(datos){
  const ctx = clienteGenero.getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Mujeres','Hombres'],
      datasets: [{
        label: '# de clientes',
        data: datos,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ],
        borderWidth: 1
      }]
    },
  });
}



