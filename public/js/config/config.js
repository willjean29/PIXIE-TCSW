export const API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IndpbGxqZWFuMjlAZ21haWwuY29tIn0.wrRIMqe8FG7aqwEeykPvQo_zTlVVux9JdnJclHiPiNM';
export const LINK_API_DNI = 'https://dniruc.apisperu.com/api/v1/dni';

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
