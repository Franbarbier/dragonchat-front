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
  },
  changePlan: async (accessToken) => {
    const response = await axios.put(
      `https://gateway-test.dragonchat.io/api/user/change-plan`,
      {
        "session_id": "asdasdasd",
        "product_id": "11111"
      },
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        }
      }
    );

    return response;
  }
}

export default apiSubscriptionsController;