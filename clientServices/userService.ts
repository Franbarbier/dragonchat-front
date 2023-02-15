import axios from 'axios';

interface LoginParams {
  email: string;
  password: string;
}

interface EditParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

interface UserService {
  login: (params: LoginParams) => Promise<any>;
  logout: () => Promise<any>;
  edit: (params: EditParams) => Promise<any>;
}

const userServiceFactory = (): UserService => {
    function login({ email, password }: LoginParams) {
        return axios.post(`/front-api/user/auth`, { email, password });
    }

    function logout() {
        return axios.get(`/front-api/user/logout`);
    }

    async function edit({ name, email, password, passwordConfirmation }: EditParams) {
      const response = await axios.put(`/front-api/user/edit`, { name, email, password, passwordConfirmation });
      return response;
  }

    return {login, logout, edit};
};

export default userServiceFactory;