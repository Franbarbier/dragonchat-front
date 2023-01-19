import axios from 'axios';

// // Obtenemos el token del localStorage
// const token = window.localStorage.getItem('token');

// const headers = {
//     'Authorization': `Bearer ${token}`
// }
const headers = ''

const ENDPOINT = `${process.env.NEXT_PUBLIC_API_USER_URL}`;

// USERS
const url_users = '/auth'
export const login = (user) => axios.post(`${ENDPOINT}${url_users}/login`, user );
export const signup = (user) => axios.post(`${ENDPOINT}${url_users}/signup`, user );

// export const verifyUser = async (id) => {
//     console.log(token)
//     var res = await fetch(`${url_users}/verify`, {method: 'GET', headers})
//     .then(response => response.json())
//     .then(data => data);
//     console.log(res)
//     return res
// }



// SEND MESSAGE

const url_message = `${process.env.API_SENDER_URL}/message/`

let headersList = {
    "Accept": "/",
    "Content-Type": "application/json"
}

// export const sendMessage = (bodyContent) => axios.post(`${url_message}send-basic`, bodyContent, headersList );
export const sendMessage = async (bodyContent) => {
    

    // const onSuccess = () => {
        // }
        
        const messageResponse = await fetch(`${process.env.API_SENDER_URL}/message/send-basic`, {
            method: "POST",
            body: bodyContent,
            headers: headersList
        });
        // var messageResponse_format;
        // if (messageResponse?.status == 200) {
        //     console.log("message respondes: ",messageResponse)
        //     messageResponse_format = messageResponse
        // }else{
        //     messageResponse_format = "Nada"
        // }
        return messageResponse
}



