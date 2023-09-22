import axios from 'axios';
import Router from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_USER_URL;
const authUrl = apiUrl + '/auth';
const passwordUrl = apiUrl + '/password'

const getHeaders = (authToken: string) => ({
    "Accept": "application/json",
    'Authorization': `Bearer ${authToken}`,
});

const apiUserController = {
    signUp: async (name, email, password, passwordConfirmation, setUserExists) => {
        try {
            const payload = { name: name, email: email, password: password, password_confirmation: passwordConfirmation };
            const response = await axios.post(`${authUrl}/signup`, payload);
            if (response.status == 201) {
                setUserExists(false);
                Router.push("/login");
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
            const response = await axios.get(`${authUrl}/me`, { headers: getHeaders(authToken) });

            return response
        } catch (error: any) {
            return error
        }
    },
    login: async (email, password) => {
        try {
            const payload = { email: email, password: password };
            const response = await axios.post(`https://gateway-test.dragonchat.io/api/auth/login`, payload);
            return response;
        } catch (error) {
        }
    },
    logout: async (accessToken) => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        headers.append("Authorization", `Bearer ${accessToken}`);
        const response = await axios.get(`${authUrl}/logout`, { headers: Object.fromEntries(headers) });
        return response;
    },
    edit: async (accessToken, name, email, password, passwordConfirmation) => {
        const headers = new Headers({
            "Content-Type": "application/json",
        });
        headers.append("Authorization", `Bearer ${accessToken}`);

        let payload;
        if (password != '') {
            payload = { password: password, password_confirmation: passwordConfirmation };
        }

        const response = await axios.put(`${authUrl}/update`, payload, { headers: Object.fromEntries(headers) });
        return response;
    },
    passwordRecoverSendEmail: async (email, setExistingUser) => {
        try {
            const payload = { email: email };
            const response = await axios.post(`${passwordUrl}/email`, payload);
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
            const response = await axios.post(`${passwordUrl}/code/check`, payload);
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
            const response = await axios.post(`${passwordUrl}/reset`, payload);
            if (response.status == 200) {
                Router.push("/login");
            }
        } catch (error: any) {
            alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
        }
        return;
    },
    updatePlan: async (login_data, stripe_data) => {
        try {

            let stripe_session = JSON.parse(stripe_data).stripe_session
            let user_id = JSON.parse(login_data).user_id


            // pasarlo como header
            const payload = { stripe_session, user_id };
            // const response = await axios.post(`$endpoint para updatear plan`, payload);
            // if (response.status == 200) {
                return 200
            // }
            // return "error"
        } catch (error: any) {
            // console.log("error");
        }
        return;
    }
}

export default apiUserController;