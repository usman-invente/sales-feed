import { apiClient } from './api';

export const registerUser = async (userData) => {
  return apiClient('/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};