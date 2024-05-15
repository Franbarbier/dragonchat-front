import axios from 'axios';
import { LOGIN_COOKIE } from '../constants/index';

const apiUrl = LOGIN_COOKIE; // change to sub api

const apiSubscriptionsController = {
  subscribe: async (email) => {
    const response = await axios.post(
      `${apiUrl}/subscribe`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    return response;
  }
  
}

export default apiSubscriptionsController;