import axios from 'axios';
import { isGuestMode } from '../mock/guestData';
import { guestRequest } from '../mock/guestApi';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const client = {
  get: (url, config) => (isGuestMode() ? guestRequest('get', url, null, config) : axiosInstance.get(url, config)),
  post: (url, data, config) => (isGuestMode() ? guestRequest('post', url, data, config) : axiosInstance.post(url, data, config)),
  put: (url, data, config) => (isGuestMode() ? guestRequest('put', url, data, config) : axiosInstance.put(url, data, config)),
  delete: (url, config) => (isGuestMode() ? guestRequest('delete', url, null, config) : axiosInstance.delete(url, config)),
};

export default client;
