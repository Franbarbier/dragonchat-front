import axios from 'axios';
import Router from 'next/router';

const apiUrl = process.env.NEXT_PUBLIC_API_USER_URL;
const authUrl = apiUrl + '/auth';
const passwordUrl = apiUrl + '/password';

const apiUserController = {
    signUp: async (name, email, password, passwordConfirmation, setUserExists) => {
        try {
            const payload = { name: name, email: email, password: password, password_confirmation: passwordConfirmation };
            const response = await axios.post(`${authUrl}/signup`, payload);
            if (response.status == 201) {
                setUserExists(false);
                Router.push("/login");
            }
        } catch(error: any) {
            if (error.response.status == 409) {
                setUserExists(true);
            } else {
                alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
                console.log(error);
            }
        }
        return;
    },
    login: async (email, password) => {
        const payload = { email: email, password: password };
        const response = await axios.post(`${authUrl}/login`, payload);
        return response;
    },
    logout: async (accessToken) => {
        const headers = new Headers({
            "Content-Type": "application/json",
          });
        headers.append("Authorization", `Bearer ${accessToken}`);
        const response = await axios.get(`${authUrl}/logout`, {headers: Object.fromEntries(headers)});
        return response;
    },
    edit: async (accessToken, name, email, password, passwordConfirmation) => {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Accept-Encoding": "*"
          });
        headers.append("Authorization", `Bearer ${accessToken}`);
        const payload = { name: name, email: email};
        if (password != '') {
            payload["password"] = password
            payload["password_confirmation"] = passwordConfirmation
        }
        const response = await axios.put(`${authUrl}/update`, payload, {headers: Object.fromEntries(headers)});
        return response;
    },
    passwordRecoverSendEmail: async (email, setExistingUser) => {
        try {
            const payload = { email: email };
            const response = await axios.post(`${passwordUrl}/email`, payload);
            if (response.status == 201) {
                Router.push("/new_password");
            }
        } catch(error: any) {
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
            console.log(error);
            alert("Algo salió mal, por favor vuelve a intentarlo en unos minutos.");
        }
        return;
    }
}

export default apiUserController;