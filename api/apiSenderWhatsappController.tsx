import axios from 'axios';
import { API_SENDER_URL } from '../constants/index';
import { API_ROUTES } from '../enums';

const getHeaders = (authToken: string) => ({
    "Content-Type": "application/json",
    'Authorization': `Bearer ${authToken}`,
});

const apiSenderWhatsappController = {
    disconnect: async (authToken: string) => {
        try {
            const response = await axios.delete(`${API_SENDER_URL}${API_ROUTES.DISCONNECT}`, { headers: getHeaders(authToken) });
            if (response.status == 200) {
                alert("Whatsapp correctamente desvinculado.");
            } else {
                alert("Tu sesión no pudo ser desvinculada de forma correcta. Espera unos momentos y vuelve a intentar.");
            }

            return response;
        } catch (error) {
            return error
        }
    },
    sendMessage: async (user, name, message, phone, authToken: string) => {
        try {
            const payload = { user, name, message, phone };
            const response = await axios.post(`${API_SENDER_URL}${API_ROUTES.SEND_MSG}`, payload, { headers: getHeaders(authToken) });
            return response
        } catch (error: any) {
            return error
        }

    },
    connect: async (authToken: string) => {
       
        try {
            const response = await axios.post(`https://gateway-test.dragonchat.io/api/whatsapp/connect`, {}, { headers: 
            {"Authorization": `Bearer ${authToken}`} });
            return response
        } catch (error: any) {
            return error
        }
    },
    getQR: async (authToken: string) => {
        try {
            const response = await axios.get(`https://gateway-test.dragonchat.io/api/whatsapp/qr`,{ headers: 
            {"Authorization": `Bearer ${authToken}`} });
            
            console.log(response, authToken)
            return response
        } catch (error: any) {
            return error
        }
    },
    isConnected: async (authToken: string) => {
        try {
            console.log(authToken)
            const response = await axios.get(`https://gateway-test.dragonchat.io/api/whatsapp/check-user-conected?validateqr=false`, { headers: 
            {"Authorization": `Bearer ${authToken}`} });
            console.log(response)
            return response
        } catch (error: any) {
            console.log(error)

            return error
        }
    },
};

export default apiSenderWhatsappController;