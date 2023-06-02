import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_SENDER_URL;
const messageUrl = `${apiUrl}/message`;
const accessToken = JSON.parse(Cookies.get(process.env.NEXT_PUBLIC_LOGIN_COOKIE_NAME)).access_token;

const apiSenderWhatsappController = {
    unlinkWhatsapp: async (userId) => {
        const url = `${apiUrl}/client/close_client/${userId}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${accessToken}`,
              },
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
            const headers = new Headers({
                "Content-Type": "application/json",
              });
            headers.append("Authorization", `Bearer ${accessToken}`);
        
            const payload = { user: userId, name: receiverName, message: message, number: receiverNumber };
            const response = await axios.post(`${messageUrl}/send-basic`, payload, {headers: Object.fromEntries(headers)});
            return response
        }catch(error:any){
            return error
        }

    }
}

export default apiSenderWhatsappController;