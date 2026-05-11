export type UserRole = 'admin' | 'staff' | 'student';

export interface User {
  id: string;
  username: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  userId: string;
  password: string;
}
