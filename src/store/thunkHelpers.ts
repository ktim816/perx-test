import {AxiosResponse} from 'axios';

import {
  update,
  exist,
} from '@/helpers';

export const getDealerIds = (data: any[]): string[] => {
  const getDealer = (el: any) => el.dealer;
  return data
    .map(getDealer)
    .filter(exist);
};

export const updateDealer = (dealers: any[]) => {
  let dealerId: string | undefined;
  const getById = (el: any) => el.id === dealerId;
  return (el: any) => {
    dealerId = el.dealer;
    el.dealer = dealers.find(getById);
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
