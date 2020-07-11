import {AxiosResponse} from 'axios';

import {
  axios,
} from '@/api';

import {
  update,
  parseURLParams,
  exist,
} from '@/helpers';

export const fetchVehicles = (params = {}): Promise<AxiosResponse<any>> => {
  return axios.get(`/vehicles/${parseURLParams(params)}`, {
    headers: {
      'X-CS-Dealer-Id-Only': 1,
    }
  });
};

export const fetchDealers = (params = {}): Promise<AxiosResponse<any>> => {
  return axios.get(`/dealers/${parseURLParams(params)}`);
};

export const toDealerId = (el: any) => {
  return el.dealer;
};

export const getDealerIds = (data: any[]): string[] => {
  return data
    .map(toDealerId)
    .filter(exist);
};

export const updateDealer = (dealers: any[]) => {
  return (el: any) => {
    const dealerId = el.dealer;
    el.dealer = dealers.find((dealer: any) => dealer.id === dealerId);
  };
};

export const getCurrentPage = (page: number | undefined): number => {
  if (!page) return 0;
  return page - 1;
};

export const getUpdatedVehicles = (vehicles: AxiosResponse<any>, dealers: any[]) => {
  const updated = update(vehicles);
  updated.data.forEach(updateDealer(dealers));
  return updated;
};
