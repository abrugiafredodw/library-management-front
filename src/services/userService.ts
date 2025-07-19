import type { Login } from "../models/login";
import type { User } from "../models/user";

const DEFAULT_API_URL = 'http://localhost:4000/api';

function userService(apiUrl: string = import.meta.env.BASE_API_URL || DEFAULT_API_URL) {
  return {
    register: async (userData: User) => {
      try {
        const response = await fetch(`${apiUrl}/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error('Error al registrar el usuario');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    },
    login: async (credentials: Login) => {
      try {
        const response = await fetch(`${apiUrl}/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });
        if (!response.ok) {
          const data2 = await response.json();
          throw new Error(data2.mensaje || 'Error al iniciar sesión');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw error;
      }
    }
  };
}

export default userService;
