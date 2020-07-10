import axiosStatic, {AxiosInstance} from 'axios';

export const axios: AxiosInstance = axiosStatic.create({
  baseURL: 'https://jlr-connect.com/carstock/api/v1/',
  responseType: 'json',
});
