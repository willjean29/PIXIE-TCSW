import axios from 'axios';

const clienteAxxios = axios.create({
  baseURL: window.location.origin
});

export default clienteAxxios;