import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/'
});

const token = ``;
api.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
