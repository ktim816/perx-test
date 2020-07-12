import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

axios.defaults.baseURL = 'https://jlr-connect.com/carstock/api/v1/';
axios.defaults.responseType = 'json';

export default class Api {

  public static fetch = (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    return axios.get(`${url}/`, config);
  }
};
