import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_USER_URL; // change to sub api

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