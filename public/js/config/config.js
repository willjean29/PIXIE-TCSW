
export const guardarToken = (token) => {
  localStorage.setItem('TOKEN',token);
}

export const obtenerToken = () => {
  let localToken = localStorage.getItem('TOKEN');
  return localToken;
}

export const eliminarToken = () => {
  localStorage.removeItem('TOKEN');
}
