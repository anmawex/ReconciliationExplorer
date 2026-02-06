import axios from 'axios';
import type { LoginCredentials, AuthResponse } from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; // Default to mock for demo purposes

// Usuarios de prueba para desarrollo
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@test.com',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin' as const,
  },
  {
    id: '2',
    email: 'user@test.com',
    password: 'user123',
    name: 'Usuario Demo',
    role: 'user' as const,
  },
  {
    id: '3',
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
    role: 'user' as const,
  },
];

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Modo desarrollo con datos mock
    if (USE_MOCK) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = MOCK_USERS.find(
            (u) => u.email === credentials.email && u.password === credentials.password
          );

          if (user) {
            resolve({
              user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
              },
              token: `mock-token-${user.id}-${Date.now()}`,
              refreshToken: `mock-refresh-token-${user.id}-${Date.now()}`,
            });
          } else {
            reject(new Error('Credenciales inválidas. Usuarios de prueba: admin@test.com/admin123, user@test.com/user123'));
          }
        }, 800); // Simular latencia de red
      });
    }

    // Modo producción con API real
    try {
      const response = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        credentials,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Error al iniciar sesión',
        );
      }
      throw new Error('Error inesperado al iniciar sesión');
    }
  }

  async logout(): Promise<void> {
    if (USE_MOCK) {
      // En modo mock, solo limpiamos el estado local
      return Promise.resolve();
    }

    try {
      await axios.post(`${API_URL}/auth/logout`);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  async refreshToken(refreshToken: string): Promise<string> {
    if (USE_MOCK) {
      return Promise.resolve(`mock-refreshed-token-${Date.now()}`);
    }

    try {
      const response = await axios.post<{ token: string }>(
        `${API_URL}/auth/refresh`,
        { refreshToken },
      );
      return response.data.token;
    } catch {
      throw new Error('Error al refrescar el token');
    }
  }

  setAuthToken(token: string | null): void {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
}

export const authService = new AuthService();
