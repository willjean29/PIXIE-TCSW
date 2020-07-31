import moment  from 'moment';
moment.locale('es');
console.log("hola desde validacion");

let fechaInicio,fechFin;
let hoy = moment().format('YYYY-MM-DD');

$('#fecha-inicio').change(function() {
  fechaInicio = $('#fecha-inicio').val();
  fechaInicio = fechaInicio.split("/").reverse().join("-");
  console.log(fechaInicio)
  if(moment(hoy).isAfter(fechaInicio)){
    console.log("fecha invalida");
    $('#fecha-inicio-val').show();
    $('#submit-competition').attr('disabled', 'disabled');
  }else{
    $('#fecha-inicio-val').hide();
    $('#submit-competition').removeAttr('disabled');
  }
})

$('#fecha-fin').change(function() {
  fechFin = $('#fecha-fin').val();
  fechFin = fechFin.split("/").reverse().join("-");
  if(moment(hoy).isAfter(fechFin)){
    console.log("fecha invalida");
    $('#fecha-fin-val').show();
    $('#submit-competition').attr('disabled', 'disabled');
  }else{
    $('#fecha-fin-val').hide();
    $('#submit-competition').removeAttr('disabled');
  }
})
