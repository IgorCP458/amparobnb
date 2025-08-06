import api from './api';

export const ListingService = {
  getAll: (filterParams: any) => {
    api.post('/listings', {
      filterParams
    })
  },
  getById: () => {

  },
  create: () => {

  }
}