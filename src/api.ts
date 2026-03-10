import axios from 'axios';
import { API_URL } from './utils/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'},
});


api.interceptors.response.use(
  response => response, 
  async (error) => {
    const originalRequest = error.config; 


    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 
      try {
        await api.post('/users/refreshToken');
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api