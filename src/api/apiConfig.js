
import axios from 'axios';

// Named exports
export const BASE_URL = import.meta.env.VITE_BASE_URL;

const isTokenValid = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure interceptors
apiClient.interceptors.request.use((config) => {
  if (config.url.includes('/admin/login')) {
    delete config.headers.Authorization;
    return config;
  }

  const token = localStorage.getItem('token');
  if (token && isTokenValid(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

// Export as both named and default
export default apiClient;