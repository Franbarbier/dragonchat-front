
interface LoginParams {
  email: string;
  password: string;
}

interface UserService {
  login: (params: LoginParams) => Promise<any>;
  logout: () => Promise<any>;
}

const userServiceFactory = (): UserService => {
    async function login({ email, password }: LoginParams) {
        try {
          const response = await fetch('/front-api/auth', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          });
          return response;
        } catch (error) {
          console.error('Error:', error);
        }
    }

    async function logout() {
      try {
        const response = await fetch('/front-api/logout', {
          method: 'GET',
        });
        return response;
      } catch (error) {
        console.error('Error:', error);
      }
    }

    return {login, logout};
};

export default userServiceFactory;