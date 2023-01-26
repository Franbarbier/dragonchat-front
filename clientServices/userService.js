import axios from 'axios';

const userServiceFactory = () => {
    function login(email, password) {
        return axios.post(`/api/auth`, { email, password });
    }

    function logout() {
        return axios.get(`/api/logout`);
    }

    return {login, logout};

    
};

export default userServiceFactory;