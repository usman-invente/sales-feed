import { apiClient } from './api';

export const submitContactForm = async (data) => {
  return apiClient('/contact', {
    method: 'POST',
    body: data,
  });
};