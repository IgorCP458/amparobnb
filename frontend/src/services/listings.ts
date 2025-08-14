import api from './api';

export const ListingService = {
  getAll: async (filterParams: any) => {
    const response = await api.post('/listings/list', filterParams)
    return response.data

  },
  getById: async (id: string | undefined) => {
    const response = await api.post('/listings/list', {
      filterParams: {
        id: id
      }
    })
    return response.data

  },
  create: () => {

  }
}