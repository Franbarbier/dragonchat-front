import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_USER_URL;
const authUrl = apiUrl + '/auth';
const passwordUrl = apiUrl + '/password'

const apiUserController = {
    login: async (email, password) => {
        try {
            const payload = { email: email, password: password };
            const response = await axios.post(`${authUrl}/login`, payload)
            return response;
        } catch(error) {
            console.log(error);
        }
    },
    passwordRecoverSendEmail: async (email) => {
        try {
            const payload = { email: email };
            const response = await axios.post(`${passwordUrl}/email`, payload)
            return response;
        } catch(error) {
            console.log(error);
        }
    }
}

export default apiUserController;