import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(conf => {
  if ('token' in localStorage) {
    conf.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }

  return conf;
});

export default api;
