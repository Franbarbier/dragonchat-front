import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_SENDER_URL;

const apiSenderWhatsappController = {
    unlinkWhatsapp: async (authToken: string) => {
        const url = `${API_URL}/client/close_client`;
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
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authToken}`,
            });

            const payload = { user: userId, name: receiverName, message: message, number: receiverNumber };
            const response = await axios.post(`${API_URL}/message/send-basic`, payload, { headers: Object.fromEntries(headers) });

            return response
        } catch (error: any) {
            return error
        }

    }
}

export default apiSenderWhatsappController;