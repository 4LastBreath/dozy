import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
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
        const res = await api.post('/users/refreshToken');
        console.log(res)
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Unable to refresh token", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api