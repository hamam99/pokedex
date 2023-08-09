import axios from 'axios';

const AxiosClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

AxiosClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

AxiosClient.interceptors.response.use(
  function (response) {
    console.log('Call API success', {
      data: response?.data,
      config: response?.config,
    });
    return response;
  },
  function (error) {
    console.log('Call API Error', {error});
    return Promise.reject(error);
  },
);

export default AxiosClient;
