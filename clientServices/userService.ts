import axios from 'axios';

interface LoginParams {
  email: string;
  password: string;
}

interface UserService {
  login: (params: LoginParams) => Promise<any>;
  logout: () => Promise<any>;
}

const userServiceFactory = (): UserService => {
    function login({ email, password }: LoginParams) {
        return axios.post(`/user/api/auth`, { email, password });
    }

    function logout() {
        return axios.get(`/user/api/logout`);
    }

    return {login, logout};
};

export default userServiceFactory;