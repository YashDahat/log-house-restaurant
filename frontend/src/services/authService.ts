import { apiClient } from '../api/client';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  role: string;
}

export async function login(authRequest: AuthRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>('/auth/login', authRequest);
  return response.data;
}