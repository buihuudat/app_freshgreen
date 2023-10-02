import axios from 'axios';
import queryString from 'query-string';
import {Alert} from 'react-native';
import {dataStorage} from '../handlers/dataStorage';

// let IP = '192.168.0.206'; // ot
// let IP = '10.68.1.215'; //ticos
let IP = '192.168.1.2';

const PORT = 5000;
const baseURL = `http://${IP}:${PORT}/api/v1`;

const axiosClient = axios.create({
  baseURL,
  paramsSerializer: (params: any): string => queryString.stringify({params}),
});

axiosClient.interceptors.request.use(
  async (config: any) => {
    const token = await dataStorage.getItem('user');

    return {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Beaber ${token}`,
      },
    };
  },
  (e: any) => {
    return Promise.reject(e);
  },
);
axiosClient.interceptors.response.use(
  (response: any) => {
    // if (response && response.data) return response.data;
    return response;
  },
  (err: any) => {
    if (!err.response) {
      return Alert.alert('error', err);
    }
    throw err.response;
  },
);

export default axiosClient;
