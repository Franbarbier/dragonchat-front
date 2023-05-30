import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_SENDER_URL;
const messageUrl = `${apiUrl}/message`;

const apiSenderWhatsappController = {
    unlinkWhatsapp: async (userId) => {
        const url = `${apiUrl}/client/close_client/${userId}`;
        const response = await fetch(url, {
            method: "PUT"
        });
        if (response.status == 200) {
            alert("Whatsapp correctamente desvinculado.");
        } else {
            alert("Tu sesión no pudo ser desvinculada de forma correcta. Espera unos momentos y vuelve a intentar.");
        }
        return response;
    },
    sendMessage: async (userId, receiverName, message, receiverNumber) => {
        try{
            const config = {
                headers: {
                    "Accept": "/",
                    "Content-Type": "application/json"
                }
            }
            const payload = { user: userId, name: receiverName, message: message, number: receiverNumber };
            const response = await axios.post(`${messageUrl}/send-basic`, payload, config);
            return response
        }catch(error:any){
            return error
        }

    }
}

export default apiSenderWhatsappController;