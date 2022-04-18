import api from './api';

export const getContracts = query => api.get('/contracts', {params: query});
export const insertContracts = query => api.post('/contracts', query);
export const updateContracts = query => api.put(`/contracts`, query);
export const deleteContracts = query => api.delete(`/contracts/${query.id}`, query);