import axios from 'axios';
import { API_SENDER_URL } from '../constants/ index';
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
            const response = await axios.post(`${API_SENDER_URL}${API_ROUTES.CONNECT}`, {}, { headers: getHeaders(authToken) });

            return response
        } catch (error: any) {
            return error
        }
    },
    getQR: async (authToken: string) => {
        try {
            const response = await axios.get(`${API_SENDER_URL}${API_ROUTES.GET_QR}`, { headers: getHeaders(authToken) });

            return response
        } catch (error: any) {
            return error
        }
    },
    isConnected: async (authToken: string) => {
        try {
            const response = await axios.get(`${API_SENDER_URL}${API_ROUTES.IS_CONNECTED}`, { headers: getHeaders(authToken) });

            return response
        } catch (error: any) {
            return error
        }
    },
};

export default apiSenderWhatsappController;