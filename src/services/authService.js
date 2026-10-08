import { apiClient } from './api';

export const registerUser = async (userData) => {
  return apiClient('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const loginService = async (credentials) => {
  return apiClient('/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const refreshSession = async () => {
  return await apiClient("/refresh", {
    method: "POST",
  });
};