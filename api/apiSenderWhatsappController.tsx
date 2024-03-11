import axios from "axios";
import { API_GATEWAY_URL } from "../constants/index";
import { API_ROUTES } from "../enums";

const getHeaders = (authToken: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${authToken}`,
});

const getHeadersVersion = (authToken: string) => ({
  "x-api-version": 1,
  Authorization: `Bearer ${authToken}`,
  "Content-Type": "application/json",
});

const apiSenderWhatsappController = {
  disconnect: async (authToken: string) => {
    try {
      const response = await axios.delete(
        `${API_GATEWAY_URL}${API_ROUTES.DISCONNECT}`,
        { headers: getHeaders(authToken) }
      );
      if (response.status == 200) {
        alert("Whatsapp correctamente desvinculado.");
      } else {
        alert(
          "Tu sesión no pudo ser desvinculada de forma correcta. Espera unos momentos y vuelve a intentar."
        );
      }

      return response;
    } catch (error) {
      return error;
    }
  },
  sendMessage: async (user, name, messages, phone, authToken: string, timeBetween:number) => {
    try {
      const payload = { user, name, messages, phone, timeBetween };
      const response = await axios.post(
        `${API_GATEWAY_URL}${API_ROUTES.SEND_MSG}`,
        payload,
        { headers: getHeadersVersion(authToken) }
      );
      return response;
    } catch (error: any) {
      return error;
    }
  },
  connect: async (authToken: string) => {
    try {
      const response = await axios.post(
        `${API_GATEWAY_URL}${API_ROUTES.CONNECT}`,
        {},
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response;
    } catch (error: any) {
      return error;
    }
  },
  getQR: async (authToken: string) => {
    try {
      const response = await axios.get(
        `${API_GATEWAY_URL}${API_ROUTES.GET_QR}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response;
    } catch (error: any) {
      return error;
    }
  },
  isConnected: async (authToken: string) => {
    try {
      const response = await axios.get(
        `${API_GATEWAY_URL}${API_ROUTES.IS_CONNECTED}`,
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return response;
    } catch (error: any) {
      if (error.response.status == 417) {
        return 417;
      }
      if (error.response.status == 412) {
        return 412;
      }
      if (error.response.status == 428) {
        return 428;
      }
      return error;
    }
  },
};

export default apiSenderWhatsappController;
