const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const apiClient = async (endpoint, options = {}) => {
  const isFormData = options.body instanceof FormData;

  const defaultHeaders = {};
  if (!isFormData) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });

    // Handle responses with empty bodies (e.g., 204 No Content)
    if (response.status === 204) return null;

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed.');
    }

    return data;
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};