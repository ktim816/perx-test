import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

import {
  update,
} from '@/helpers';

export default class Api {

  public static fetch = (
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> => {
    return axios.get(`${url}/`, update(config, {
      baseURL: 'https://jlr-connect.com/carstock/api/v1/',
      responseType: 'json',
    }));
  }
};
