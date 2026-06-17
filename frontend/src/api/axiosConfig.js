import axios from 'axios';
import { isGuestMode, endGuestSession } from '../mock/guestData';
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

// Auth routes always go to the real backend — even in guest mode.
// When a visitor signs up or logs in from guest mode we end the guest
// session first so they get a real token and a real company profile.
const AUTH_ROUTES = ['/auth/login', '/auth/signup', '/auth/register'];
const isAuthRoute = (url) => AUTH_ROUTES.some((r) => url?.startsWith(r));

const shouldUseMock = (url) => isGuestMode() && !isAuthRoute(url);

const client = {
  get:    (url, config)       => shouldUseMock(url) ? guestRequest('get',    url, null, config) : axiosInstance.get(url, config),
  post:   (url, data, config) => {
    if (isAuthRoute(url) && isGuestMode()) {
      // Transition: end guest session so real token is stored cleanly
      endGuestSession();
    }
    return shouldUseMock(url) ? guestRequest('post', url, data, config) : axiosInstance.post(url, data, config);
  },
  put:    (url, data, config) => shouldUseMock(url) ? guestRequest('put',    url, data, config) : axiosInstance.put(url, data, config),
  delete: (url, config)       => shouldUseMock(url) ? guestRequest('delete', url, null, config) : axiosInstance.delete(url, config),
};

export default client;
