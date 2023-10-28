import axios from 'axios';
import Router from 'next/router';
import { API_GATEWAY_URL } from '../constants/index';
import { API_ROUTES, HTTP_HEADERS_KEYS, HTTP_HEADERS_VALUES, ROUTES } from '../enums';


const getHeaders = (authToken: string) => ({
    [HTTP_HEADERS_KEYS.AUTHORIZATION]: `${HTTP_HEADERS_VALUES.BEARER} ${authToken}`,
});

const apiUserController = {
    signUp: async (name, mail, password, passwordConfirmation, setUserExists, stripe_data) => {
        try {
            const payload = { name: name, mail: mail, password: password, password_confirmation: passwordConfirmation };

            // Si existe stripe_data, lo agrego al payload para que se registre como premium
            if (stripe_data.stripe_data) {
                payload['subscription'] = JSON.parse(stripe_data.stripe_data)
            }

            const response = await axios.post(`${API_GATEWAY_URL}${API_ROUTES.SIGN_UP}`, payload, {
                headers: {
                    [HTTP_HEADERS_KEYS.ACCEPT]: HTTP_HEADERS_VALUES.APLICATION_JSON,
                    [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON,
                }
            });

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

        let payload = { name, mail: email };
        let passs = { password: password, password_confirmation: passwordConfirmation }

        if (password != "") {
            payload = { ...payload, ...passs };
        }

        console.log(payload)

        const response = await axios.put(`https://gateway-test.dragonchat.io/api/user/edit`, payload, { headers: Object.fromEntries(headers) });

        console.log(response)

        return response;
    },
    passwordRecoverSendEmail: async (mail: string, setExistingUser: (value: boolean) => void) => {
        try {
            const response = await axios.post(
                'https://gateway-test.dragonchat.io/api/password/send-mail',
                { mail },
                { headers: { [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON, } },
            );

            if (response.status >= 200 || response.status <= 299) {
                Router.push(ROUTES.NEW_PASS);
            }
        } catch (error: any) {
            if (error.response.status == 404) {
                setExistingUser(false);
            } else {
                alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.")
            }
        }
    },
    passwordRecoverCheckOtp: async (code, setValidOtp: (value: boolean | null) => void) => {
        try {
            const response = await axios.post<{ message: string, success: boolean }>(
                'https://gateway-test.dragonchat.io/api/password/check-code',
                { code },
                { headers: { [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON, } },
            );

            if (response.data?.success) {
                setValidOtp(true);
            }
        } catch (error: any) {
            if (error.response.status >= 400) {
                alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
                setValidOtp(false);
            }
        }
    },
    passwordRecoverChangePassword: async (code, password, password_confirmation) => {
        try {
            const response = await axios.post(
                'https://gateway-test.dragonchat.io/api/password/change-pass',
                { code, password, password_confirmation },
                { headers: { [HTTP_HEADERS_KEYS.CONTENT_TYPE]: HTTP_HEADERS_VALUES.APLICATION_JSON, } },
            );

            if (response.data?.success) {
                Router.push(ROUTES.LOGIN);
            }
        } catch (error: any) {
            alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
        }
    },
    updatePlan: async (accessToken, stripe_data) => {
        try {
            const response = await axios.put(
                `${API_GATEWAY_URL}${API_ROUTES.UPDATE_PLAN}`,
                {
                    "session_id": stripe_data.session_id,
                    "product_id": stripe_data.product_id
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