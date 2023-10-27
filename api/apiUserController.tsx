import axios from 'axios';
import Router from 'next/router';
import { API_GATEWAY_URL } from '../constants/index';
import { API_ROUTES } from '../enums';


const getHeaders = (authToken: string) => ({
    'Authorization': `Bearer ${authToken}`,
});

const apiUserController = {
    signUp: async (name, mail, password, passwordConfirmation, setUserExists, stripe_data) => {
        try {
            const payload = { name: name, mail: mail, password: password, password_confirmation: passwordConfirmation};

            // Si existe stripe_data, lo agrego al payload para que se registre como premium
            if (stripe_data.stripe_data) {
                payload['subscription'] = JSON.parse(stripe_data.stripe_data)
            }

            const response = await axios.post(`${API_GATEWAY_URL}${API_ROUTES.SIGN_UP}`, payload, {headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              }});

            if (response.status == 201) {
                setUserExists(false);
                return response;
            }
        } catch (error: any) {
            if (error.response.status == 409) {
                setUserExists(true);
            } else {
                alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
            }
        }
        return;
    },
    getData: async (authToken: string) => {
        try {
            const response = await axios.get(`${API_GATEWAY_URL}${API_ROUTES.GET_DATA}`, { headers: getHeaders(authToken) });
            return response
        } catch (error: any) {
            return error
        }
    },
    login: async (email, password) => {
        try {
            const payload = { mail: email, password: password };
            const response = await axios.post(`${API_GATEWAY_URL}${API_ROUTES.LOGIN}`, payload);
            return response;
        } catch (error) {
        }
    },
    logout: async (authToken: string) => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        headers.append("Authorization", `Bearer ${authToken}`);
        const response = await axios.get(`${API_GATEWAY_URL}${API_ROUTES.LOGOUT}`, { headers: getHeaders(authToken) });
        return response;
    },
    edit: async (accessToken, name, email, password, passwordConfirmation) => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        headers.append("Authorization", `Bearer ${accessToken}`);

        let payload = {name, mail: email };
        let passs = { password: password, password_confirmation: passwordConfirmation  }

        if (password != "") {
            payload = { ...payload, ...passs };
        }
        
        console.log(payload)

        const response = await axios.put(`https://gateway-test.dragonchat.io/api/user/edit`, payload, { headers: Object.fromEntries(headers) });

        console.log(response)
        
        return response;
    },
    passwordRecoverSendEmail: async (email, setExistingUser) => {
        try {
            const payload = { email: email };
            const response = await axios.post(``, payload);
            if (response.status == 201) {
                Router.push("/new_password");
            }
        } catch (error: any) {
            if (error.response.status == 422 || error.response.status == 404) { // should be a 404 and not 422
                setExistingUser(false);
            } else {
                alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.")
            }
        }
    },
    passwordRecoverCheckOtp: async (otpCode, setValidOtp) => {
        try {
            const payload = { code: otpCode };
            const response = await axios.post(``, payload);
            if (response.status == 200) {
                setValidOtp(true);
            }
        } catch (error: any) {
            if (error.response.status == 422 || error.response.status == 404) { // should be a 404 and not 422
                setValidOtp(false);
            } else {
                alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.")
            }
        }
        return;
    },
    passwordRecoverChangePassword: async (otpCode, newPassword, newPasswordConfirmation) => {
        try {
            const payload = { code: otpCode, password: newPassword, password_confirmation: newPasswordConfirmation };
            const response = await axios.post(``, payload);
            if (response.status == 200) {
                Router.push("/login");
            }
        } catch (error: any) {
            alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
        }
        return;
    },
    updatePlan: async (accessToken, stripe_data) => {
        try {
            const response = await axios.put(
                `${API_GATEWAY_URL}${API_ROUTES.UPDATE_PLAN}`,
                {
                  "session_id": stripe_data.session_id,
                  "product_id":  stripe_data.product_id
                },
                {
                  headers: {
                    "Authorization": `Bearer ${accessToken}`,
                  }
                }
              );
          
              return response;
        } catch (error: any) {
            // console.log("error");
        }
        return;
    }
}

export default apiUserController;