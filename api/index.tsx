import axios from 'axios';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = ''

const ENDPOINT = 'http://api-user.dragonchat.io/api/v1/auth/';

const url_users = ''

export const login = (user) => axios.post(`${ENDPOINT}login`, user );
export const signup = (user) => axios.post(`${ENDPOINT}signup`, user );

// export const getUsers = (filtros) => axios.get(url_users, {...filtros, headers});
// export const deleteUser = (id) => axios.delete(`${url_users}/${id}`, {headers});
// export const updateUser = (updateData) => axios.patch(`${url_users}`, updateData, {headers});
// export const isAdmin = (user) => axios.post(`${url_users}/isAdmin`, user );

// export const verifyUser = async (id) => {
//     console.log(token)
//     var res = await fetch(`${url_users}/verify`, {method: 'GET', headers})
//     .then(response => response.json())
//     .then(data => data);
//     console.log(res)
//     return res
// }
