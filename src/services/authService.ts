import api from '../lib/axios';
import { AuthResponse, LoginCredentials, User } from '../types';

export const AuthService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    const data = response.data;

    // Store in localStorage
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  },

  async changePassword(newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { newPassword });
  },

  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
};
