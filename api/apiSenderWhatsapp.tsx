import Router from 'next/router';

const apiUrl = "http://api-sender.dragonchat.io/api/v1/";

const apiSenderWhatsappController = {
    unlinkWhatsapp: async (userId) => {
        const url = `${apiUrl}client/close_client/${userId}`;
        const response = await fetch(url, {
            method: "PUT"
        });
        if (response.status == 200) {
            alert("Whatsapp correctamente desvinculado.");
            return Router.push("/qr");
        } else {
            alert("Tu sesión no pudo ser desvinculada de forma correcta. Espera unos momentos y vuelve a intentar.");
            return response;
        }
    }
}

export default apiSenderWhatsappController;