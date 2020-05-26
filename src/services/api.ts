import axios from 'axios';

// IP da máquina: 192.168.0.19;

const api = axios.create({
  baseURL: 'http://192.168.0.19:3333',
});

export default api;
