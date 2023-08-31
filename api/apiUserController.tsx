import axios from 'axios';
import Router from 'next/router';
import Stripe from 'stripe';


const stripe = new Stripe(
    'sk_test_51Ne1vbGJHFIFZqbFPmHOku7oieP5tWkeW3F1RH0VaEoAjF3koewaONE4SejBZTEKUktD8Z6lFKXsabiPze2pJPl600GKNMJGIe',
    { apiVersion: '2023-08-16' }
);

const apiUrl = process.env.NEXT_PUBLIC_API_USER_URL;
const authUrl = apiUrl + '/auth';
const passwordUrl = apiUrl + '/password'


const apiUserController = {
    poc: async () => {
        try {
            const prices = await stripe.prices.list();
            console.log("olas2", prices);

            // const paymentIntent = await stripe.paymentIntents.create({
            //     amount: 1,
            //     currency: 'usd',
            //     payment_method_types: ['card'],
            //     payment_method: "pm_card_visa",
            //     confirm: true,
            //     capture_method: 'automatic_async',
            //   });

            const sessions = await stripe.checkout.sessions.list();
            console.log("asdf sessions", sessions.data[0], sessions.data[1])

            const session = await stripe.checkout.sessions.create({

                billing_address_collection: 'auto',
                line_items: [
                    {
                        price: prices.data[0].id,
                        // For metered billing, do not pass quantity
                        quantity: 1,
                    },
                ],
                mode: 'subscription',
                success_url: `http://127.0.0.1:3000/login/bien`,
                cancel_url: `http://127.0.0.1:3000/login/mal`,
            });

            console.log("ASDF!!", session.url);
            if (session.url) {
                console.log("ASDF!! redirect");
                window.location.href = session.url;
            }
            console.log("ASDF!! fin");
        } catch (error) {
            console.log("ERROR", error)
        }
    },
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
    login: async (email, password) => {
        try {
            const payload = { email: email, password: password };
            const response = await axios.post(`${authUrl}/login`, payload);
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
    }
}

export default apiUserController;