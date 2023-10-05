import axios from 'axios';

const getHeaders = (authToken: string) => ({
    "Content-Type": "application/json",
    'Authorization': `Bearer ${authToken}`,
});

const apiSenderWhatsappController = {
    disconnect: async (authToken: string) => {
        try {
            const response = await axios.delete(`https://gateway-test.dragonchat.io/api/whatsapp/disconnect`, { headers: getHeaders(authToken) });
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
            const response = await axios.post(`https://gateway-test.dragonchat.io/api/whatsapp/send-message`, payload, { headers: {"Authorization": `Bearer ${authToken}`} });
            console.log("send message", response)
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