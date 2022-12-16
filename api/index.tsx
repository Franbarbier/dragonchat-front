import axios from 'axios';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = ''

const ENDPOINT = 'http://api-user.dragonchat.io/api/v1/';

// USERS
const url_users = 'auth/'
export const login = (user) => axios.post(`${ENDPOINT}${url_users}login`, user );
export const signup = (user) => axios.post(`${ENDPOINT}${url_users}signup`, user );

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


// SEND MESSAGE

const url_message = 'http://api-sender.dragonchat.io/api/v1/message/'

let headersList = {
    "Accept": "/",
    "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    "Content-Type": "application/json"
}

// export const sendMessage = (bodyContent) => axios.post(`${url_message}send-basic`, bodyContent, headersList );
export const sendMessage = async (bodyContent) => {
    

    // const onSuccess = () => {
    //     console.log(messageResponse)
    //     return messageResponse
    // }

    return await fetch("http://api-sender.dragonchat.io/api/v1/message/send-basic", {
        method: "POST",
        body: bodyContent,
        headers: headersList
    });
    // onSuccess()
}



