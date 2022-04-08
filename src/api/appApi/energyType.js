import api from './api';

export const getEnergyType = query => api.get('/energy', {params: query});
export const insertEnergyType = query => api.post('/energy', query);
export const updateEnergyType = query => api.put(`/energy`, query);
export const deleteEnergyType = query => api.delete(`/energy/${query.id}`, query);