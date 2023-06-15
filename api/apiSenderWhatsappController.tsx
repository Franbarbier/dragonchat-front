import axios from 'axios';
import { API_SENDER_URL } from '../constants/ index';
import { API_ROUTES } from '../enums';

const apiSenderWhatsappController = {
    unlinkWhatsapp: async (authToken: string) => {
        const url = `${API_SENDER_URL}${API_ROUTES.UNLINK_WSP}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${authToken}`,
            },
        });
        if (response.status == 200) {
            alert("Whatsapp correctamente desvinculado.");
        } else {
            alert("Tu sesión no pudo ser desvinculada de forma correcta. Espera unos momentos y vuelve a intentar.");
        }

        return response;
    },
    sendMessage: async (userId, receiverName, message, receiverNumber, authToken: string) => {
        try {
            const payload = { user: userId, name: receiverName, message: message, number: receiverNumber };
            const response = await axios.post(
                `${API_SENDER_URL}${API_ROUTES.SEND_MSG}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    }
                }
            );

            return response
        } catch (error: any) {
            return error
        }

    },
    connect: async (authToken: string) => {
        try {
            const response = await axios.post(
                `${API_SENDER_URL}${API_ROUTES.CONNECT}`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    }
                }
            );

            return response
        } catch (error: any) {
            return error
        }
    },
    getQR: async (authToken: string) => {
        try {
            const response = await axios.get(
                `${API_SENDER_URL}${API_ROUTES.GET_QR}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    }
                }
            );

            return response
        } catch (error: any) {
            return error
        }
    },
    isConnected: async (authToken: string) => {
        try {
            const response = await axios.get(
                `${API_SENDER_URL}${API_ROUTES.IS_CONNECTED}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${authToken}`,
                    }
                }
            );

            return response
        } catch (error: any) {
            return error
        }
    },
};

export default apiSenderWhatsappController;