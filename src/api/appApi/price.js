import api from './api';

export const getPrices = query => api.get('/prices', {params: query});
export const insertPrices = query => api.post('/prices', query);
export const updatePrices = query => api.put(`/prices`, query);
export const deletePrices = query => api.delete(`/prices/${query.id}`, query);