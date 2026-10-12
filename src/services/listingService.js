import { apiClient } from "./api";

export const addUserListing = async (data) => {
  return apiClient('/product', {
    method: 'POST',
    body: data,
  });
};