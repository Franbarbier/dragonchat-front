const apiUrl = process.env.NEXT_PUBLIC_API_USER_URL;
const authUrl = apiUrl + '/auth';

const apiUserController = {
    login: async (email, password) => {
        try {
            const payload = { email: email, password: password };
            const response = await fetch(`${authUrl}/login`, {
                method: "POST",
                body: JSON.stringify(payload)
            })
            const data = await response.json();
            console.log(data)
            return data;
        } catch(error) {
            console.log(error);
        }
    }
}

export default apiUserController;