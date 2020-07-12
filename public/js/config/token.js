import clienteAxios from './clienteAxios';

const tokenAuth = (token) => {
  if(token){
    clienteAxios.defaults.headers.common['token'] = token
  }else{
    delete clienteAxios.defaults.headers.common['token'];
  }
}

export default tokenAuth;