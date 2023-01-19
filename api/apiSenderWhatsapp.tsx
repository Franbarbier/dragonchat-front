const apiUrl = "http://api-sender.dragonchat.io/api/v1/";

const apiSenderWhatsappController = {
    unlinkWhatsapp: (userId) => {
        const url = `${apiUrl}client/close_client/${userId}`;
        const res = fetch(url, {
            method: "PUT"
        });
        return res;        
    }
}

export default apiSenderWhatsappController;