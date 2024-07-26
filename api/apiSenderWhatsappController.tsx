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
        { headers:  getHeadersVersion(authToken) }
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

      let errorNum = error.response.status
      
      return errorNum;
    }
  },
};

export default apiSenderWhatsappController;
