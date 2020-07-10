import isEmpty from 'lodash/isEmpty';

export const parseURLParams = (params = {}): string => {
  if (isEmpty(params)) return '';
  const parsedParams = Object
    .entries(params)
    .map((prop) => prop.join('='))
    .join('&');
  return `?${parsedParams}`;
}; 
