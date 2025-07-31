import api from './api';

export async function getListings(bodyData: any) {
  const response = await api.post('/listings/list', bodyData);
  return response.data;
}